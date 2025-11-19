import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { LogLevel, UserOperation } from 'generated/prisma';
;

@Controller('logs')
export class UserAuditController {
  constructor(private readonly PrismaService: PrismaService) {}

  @Get()
  async findLogs(@Body('userId') userId?: string) {
  }
  
  @Get(':id')
  async findLogById(@Param('id') id: string) {
  }
}
