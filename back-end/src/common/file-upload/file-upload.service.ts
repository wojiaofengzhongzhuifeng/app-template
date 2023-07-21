import { Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';

@Injectable()
export class FileUploadService {

  // 合法的 excel 第一行内容
  static langStringList = ["en", "cn", "br", "de", "es", "id", "pt", "ru", "th", "tr", "uk", "vn", "ja", "ar", "fr", "tw"]

  resolveExcelFile(fileObj: File){
    console.log(fileObj);

  }
}
