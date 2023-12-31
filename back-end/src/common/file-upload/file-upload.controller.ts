import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import * as path from "path";

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Get()
  helloWorld(){
    return {
      text: 'success'
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
      }
    })
  }))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return file
  }


  @Post('/resolve')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: path.resolve(__dirname, './../../../uploads'),
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
      }
    })
  }))
  resolveExcelFile(@UploadedFile() file) {
    console.log(file);
    this.fileUploadService.resolveExcelFile(file)
    return file
  }

}
