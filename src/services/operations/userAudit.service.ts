import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { v7 as uuid7 } from 'uuid';
import { LogLevel, UserOperation } from 'generated/prisma';


@Injectable()
export class UserAuditService {
  constructor(private prisma: PrismaService) {}

  async createLog(params: {
    userId: string;        
    email: string;
    operation: UserOperation;
    level?: LogLevel;
    description?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.userLogs.create({
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
    return this.prisma.userLogs.findMany({
      where: userId ? { userId } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findLogById(id: string) {
    const log = await this.prisma.userLogs.findUnique({
      where: { id },
    });
    if (!log) throw new NotFoundException(`Log with id ${id} not found`);
    return log;
  }

  async updateLog(id: string, data: { description?: string; level?: LogLevel }) {
    await this.findLogById(id);

    return this.prisma.userLogs.update({
      where: { id },
      data,
    });
  }

  async deleteLog(id: string) {
    await this.findLogById(id);

    return this.prisma.userLogs.delete({
      where: { id },
    });
  }
}
