import { Injectable } from '@nestjs/common';
import xlsx from 'node-xlsx'
import * as fs from 'fs'
import * as path from "path";
import {File} from './entities/file.entity'
import {RequestException} from "../exceptions/request.exception";
import * as archiver from 'archiver'
import {MessageCodeMap} from "../interceptors/response.interceptor";
import {InternalError1Exception} from "../exceptions/internal-error-1.exception";



@Injectable()
export class FileUploadService {
  // todo 语言数量允许调整
  static langStringList = ["en", "cn", "br", "de", "es", "id", "pt", "ru", "th", "tr", "uk", "vn", "ja", "ar", "fr", "tw"]



  // 合法的 excel 第一行内容

  resolveExcelFile(fileObj: File){
    console.log(fileObj);
    const {filename} = fileObj
    const filenameWithoutSuffix = filename.split('.xlsx')[0]


    // 1. 读取上传文件内容，转化为 js 数组，只取第一个表格作为数据源
    const dataListList = this.getListFromExcelFile(filename)

    // 2. 判断上传的文件，是否符合模版
    const firstRowList = dataListList[0]
    let isLegal = this.checkFirstRowIsLegal(firstRowList)
    if(!isLegal){throw new RequestException('模版出现错误')}


    // 3. 将数据重新组装
    const resultArray = this.assembleData(dataListList)

    // 4. 将数据存储到 uploads/translate-js/1689929026571-test111 目录中
    this.saveToDir(filenameWithoutSuffix, resultArray)
  }


  getListFromExcelFile(filename){
    const fileName1 = path.resolve(__dirname, `./../../../uploads/${filename}`)


    const workSheetsFromFile = xlsx.parse(fileName1);
    const datalistList = workSheetsFromFile[0].data // [[第一行数据]],[第二行数据]]
    return datalistList



  }

  checkFirstRowIsLegal(list){
    // 顺序只能是en	cn	br	de	es	id	pt	ru	th	tr	uk	vn	ja	ar	fr	tw
    let trimmedArray = list.map(item => item.trim());
    let string = trimmedArray.join(',');

    console.log('string', string);

    let string1 = FileUploadService.langStringList.join(',')

    console.log('string1', string1);

    return string.length <= string1.length;
  }


  assembleData(dataListList){
    const resultArray = []
    dataListList.forEach((rowList, index)=>{
      // 每行的数据
      if(rowList.length === 0){return}
      if(index === 0){
        rowList.map((lang)=>{
          resultArray.push([lang])
        })
      } else {
        rowList.map((txt, index)=>{
          if(resultArray[index]){
            resultArray[index].push(txt)
          }
        })
      }
    })

    return resultArray


  }

  createDir(saveDirPathName){
    return new Promise((resolve, reject)=>{
      fs.mkdir(saveDirPathName, { recursive: true }, (err) => {
        if(err){
          reject(err)
        }
        resolve(saveDirPathName)
      });
    })
  }

  pushWriteTaskToList(resultArray, saveDirPathName, keyList){
    let writeFilePromiseList = []
    resultArray.map((langResult, index) => {
      if (index === 0) {
        return
      }
      const lang = langResult[0].toLowerCase()

      const saveFilePathName = path.join(saveDirPathName, `lang_${lang}.js`)


      let sumContent = ``
      langResult.map((content, index) => {
        // 第一行直接跳过
        if (index === 0) {
          return
        }
        let key = this.removeAllNoASCIIChar(this.removeAllNewLine(keyList[index]))
        let value = this.removeAllNewLine(content)
        sumContent += `lang[\`${key}\`] = \`${value}\`\n`
      })


      let writePromise = this.writeFile(saveFilePathName, sumContent)
      writeFilePromiseList.push(writePromise)


    })

    return writeFilePromiseList
  }

  compressDirToZip(saveDirPathName, zipFileOutputPathName){
    this.zipDir(saveDirPathName, zipFileOutputPathName).then(() => {}).catch(() => {
    })
  }


  async saveToDir(dirName, resultArray) {
    const keyList = resultArray[0]
    const saveDirPathName = path.resolve(__dirname, `./../../../uploads/translate-js/${dirName}`)





    try{
      // 1. 根据上传文件名称，创建目录A
      await this.createDir(saveDirPathName)

      // 2. 创建 js 翻译文件
      const writeTaskPromiseList = this.pushWriteTaskToList(resultArray, saveDirPathName, keyList)
      await Promise.all(writeTaskPromiseList)

      // 3. 将目录A压缩成zip
      const zipFileOutputPathName = path.resolve(__dirname, `./../../../uploads/translate-js/${dirName}.zip`)
      await this.zipDir(saveDirPathName, zipFileOutputPathName)

    } catch (e) {
      throw new InternalError1Exception(MessageCodeMap.internalError, e)
    }


  }



  removeAllNoASCIIChar(str){
    return str.replace(/[^\x00-\x7F]/g, "");
  }

  removeAllNewLine(string){
    if(string){
      return string.trim()
    }

  }

  templateFile(content){
    return `
if (typeof lang == "undefined") {var lang = [];} 
lang[\`：\`] = \`:\`
lang[\`，\`] = \`,\`
${content}
export default lang;
`
  }

  zipDir (source, out){
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = fs.createWriteStream(out);

    return new Promise((resolve, reject) => {
      archive
        .directory(source, false)
        .on('error', err => reject(err))
        .pipe(stream)
      ;

      stream.on('close', () => resolve({source, out}));
      archive.finalize();
    });
  }

  writeFile(saveFilePathName, sumContent){
    return new Promise((resolve, reject)=>{
      fs.writeFile(saveFilePathName, this.templateFile(sumContent), function (err) {
        console.log('File is created successfully.');
        if(err){reject(err);return}
        resolve(saveFilePathName)
      });
    })
  }



}
