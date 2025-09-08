import { Controller, Get, Post, Body, Param, Patch, Delete, LogLevel } from '@nestjs/common';
import { FileAuditService } from '@services/operations/fileAudit.service';
import { FileOperation } from 'generated/prisma';


@Controller('file-logs')
export class FileAuditController {
  constructor(private readonly fileAuditService: FileAuditService) {}

  // CREATE
  @Post()
  async createLog(
    @Body() body: {
      userId: string;
      email: string;
      operation: FileOperation;
      level?: LogLevel;
      description?: string;
      fileName?: string;
      fileSize?: number;
      fileType?: string;
      folderId?: string;
    },
  ) {
    return this.fileAuditService.createLog(body);
  }

  // READ ALL (opcional filtrar por userId)
  @Get()
  async findLogs(@Body('userId') userId?: string) {
    return this.fileAuditService.findLogs(userId);
  }

  // READ ONE
  @Get(':id')
  async findLogById(@Param('id') id: string) {
    return this.fileAuditService.findLogById(id);
  }

  // UPDATE
  @Patch(':id')
  async updateLog(
    @Param('id') id: string,
    @Body()
    body: {
      description?: string;
      level?: LogLevel;
      fileName?: string;
      fileSize?: number;
      fileType?: string;
      folderId?: string;
    },
  ) {
    return this.fileAuditService.updateLog(id, body);
  }

  @Delete(':id')
  async deleteLog(@Param('id') id: string) {
    return this.fileAuditService.deleteLog(id);
  }
}
