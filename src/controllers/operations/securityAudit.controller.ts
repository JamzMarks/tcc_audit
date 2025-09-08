import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SecurityAuditService } from '@services/operations/securityAudit.service';
import { LogLevel, SecurityOperation } from 'generated/prisma';


@Controller('security-logs')
export class SecurityAuditController {
  constructor(private readonly securityAuditService: SecurityAuditService) {}

  @Get()
  async findLogs(@Body('userId') userId?: string) {
    return this.securityAuditService.findLogs(userId);
  }

  @Get(':id')
  async findLogById(@Param('id') id: string) {
    return this.securityAuditService.findLogById(id);
  }
}
