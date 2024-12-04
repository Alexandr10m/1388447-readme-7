import "multer"
import {Express} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {Controller, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";

import {MongoIdValidationPipe} from "@project/pipes";
import {fillDto} from "@project/helpers";

import {FileUploaderRdo} from "./file-uploader.rdo";
import {FileUploaderService} from "./file-uploader.service";

@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(FileUploaderRdo, fileEntity.toPOJO());
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(FileUploaderRdo, existFile.toPOJO());
  }
}
