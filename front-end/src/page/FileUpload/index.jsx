import React, {useState} from 'react'
import {Button, message, Upload} from "antd";
import {BASE_URL} from "../../utils/index.js";


const FileUpload = ()=>{
  const [downloadUrl, setDownloadUrl] = useState('')
  const props = {
    name: 'file',
    action: `${BASE_URL}/file-upload/resolve`,

    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const filename = info.file.response.data.filename.split('.xlsx')[0]

        setDownloadUrl(`${BASE_URL}/translate-js/${filename}.zip`)
        // setSuccessUpload(true)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // setSuccessUpload(false)
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    accept: '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };
  // const downloadUrl = successUpload ? `${BASE_URL}/translate-js/1689935479503-test111.zip` : ''


  return (
    <div>
      <Upload  {...props} itemRender={()=>{return null}}>
        <Button>Click to Upload</Button>
      </Upload>

      {downloadUrl && (
        <a href={downloadUrl}>下载 zip 文件</a>
      )}
    </div>
  )
}
export default FileUpload
