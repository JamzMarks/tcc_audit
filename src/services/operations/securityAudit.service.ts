import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { v7 as uuid7 } from 'uuid';
import { LogLevel, SecurityOperation } from 'generated/prisma';


@Injectable()
export class SecurityAuditService {
  constructor(private prisma: PrismaService) {}


  async createLog(params: {
    userId: string;                
    email: string;
    operation: SecurityOperation;
    level?: LogLevel;
    description?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.userSecurityLogs.create({
      data: {
        id: uuid7(),
        userId: params.userId,
        email: params.email,
        operation: params.operation,
        level: params.level ?? LogLevel.INFO,
        description: params.description,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    });
  }

  async findLogs(userId?: string) {
    return this.prisma.userSecurityLogs.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findLogById(id: string) {
    const log = await this.prisma.userSecurityLogs.findUnique({
      where: { id },
    });
    if (!log) throw new NotFoundException(`Security log with id ${id} not found`);
    return log;
  }

  async updateLog(
    id: string,
    data: {
      description?: string;
      level?: LogLevel;
    },
  ) {
    await this.findLogById(id);
    return this.prisma.userSecurityLogs.update({
      where: { id },
      data,
    });
  }

  async deleteLog(id: string) {
    await this.findLogById(id);
    return this.prisma.userSecurityLogs.delete({
      where: { id },
    });
  }
}
