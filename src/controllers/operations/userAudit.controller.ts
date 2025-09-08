import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserAuditService } from '@services/operations/userAudit.service';
import { LogLevel, UserOperation } from 'generated/prisma';
;

@Controller('user-logs')
export class UserAuditController {
  constructor(private readonly userAuditService: UserAuditService) {}

  @Get()
  async findLogs(@Body('userId') userId?: string) {
    return this.userAuditService.findLogs(userId);
  }
  
  @Get(':id')
  async findLogById(@Param('id') id: string) {
    return this.userAuditService.findLogById(id);
  }

}
