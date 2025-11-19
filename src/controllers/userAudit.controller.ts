import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersAuditService } from '../services/usersAudit.service';
import { UserOperation } from 'generated/prisma';

@Controller('user-audit')
export class UsersAuditController {
  constructor(private readonly auditService: UsersAuditService) {}

  @MessagePattern('user.audit')
  async UserAuditLog(@Payload() data: any) {
    console.log('Received user audit:', data);

    await this.auditService.createUserInfoLog({
      userId: data.userId,
      operation: data.operation as UserOperation,
      payload: data.payload,
    });
  }

  @MessagePattern('user-security.audit')
  async UserSecurityAuditLog(@Payload() data: any) {
    console.log('Received user audit:', data);

    await this.auditService.createUserInfoLog({
      userId: data.userId,
      operation: data.operation as UserOperation,
      payload: data.payload,
    });
  }

  @Get()
  async findLogs(@Query('take') take: number) {
    return this.auditService.findLogs({take});
  }

//   @Get(':id')
//   async findLogById(@Param('id') id: string) {
//     return this.userAuditService.findLogById(id);
//   }
}
