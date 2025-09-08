import { Controller, Get, Post, Body, Param, Patch, Delete, LogLevel } from '@nestjs/common';
import { FileAuditService } from '@services/operations/fileAudit.service';
import { FileOperation } from 'generated/prisma';


@Controller('file-logs')
export class FileAuditController {
  constructor(private readonly fileAuditService: FileAuditService) {}

  @Get(':id')
  async findLogById(@Param('id') id: string) {
    return this.fileAuditService.findLogById(id);
  }

//   @Delete(':id')
//   async deleteLog(@Param('id') id: string) {
//     return this.fileAuditService.deleteLog(id);
//   }
}
