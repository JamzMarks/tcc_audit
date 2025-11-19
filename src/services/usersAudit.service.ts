import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LogLevel, UserOperation } from 'generated/prisma';
import { UserInfoDto } from 'src/dto/UserInfoDto';
import { UserSecurityDto } from 'src/dto/UserSecurityDto';


@Injectable()
export class UsersAuditService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserInfoLog(data: UserInfoDto) {
    return this.prisma.userLogs.create({
      data: {
        operation: data.operation,
        userId: data.userId,
        level: LogLevel.INFO ? data.level : LogLevel.INFO,
        email: data.payload.email,
        description: data.payload.description || null,
        ipAddress: data.payload.ipAddress || null,
        userAgent: data.payload.userAgent || null,
      },
    });
  }

  async createUserSecurityInfoLog(data: UserSecurityDto) {
    return this.prisma.userSecurityLogs.create({
      data: {
        operation: data.operation,
        userId: data.userId,
        email: data.email,
        level: LogLevel.INFO ? data.level : LogLevel.INFO,
        description: data.payload.description || null,
        ipAddress: data.payload.ipAddress || null,
        userAgent: data.payload.userAgent || null,
      },
    });
  }
  async findLogs(params: {
    userId?: string;
    operation?: UserOperation;
    level?: LogLevel;
    startDate?: Date;
    endDate?: Date;
    skip?: number;
    take?: number;
  }) {
    const { userId, operation, level, startDate, endDate, skip, take } = params;

    return this.prisma.userLogs.findMany({
      where: {
        userId,
        operation,
        level,
        createdAt: startDate || endDate ? {
          gte: startDate,
          lte: endDate,
        } : undefined,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  async findLogById(id: string) {
    const log = await this.prisma.userLogs.findUnique({ where: { id } });
    if (!log) throw new NotFoundException(`Log with id ${id} not found`);
    return log;
  }

  async deleteLog(id: string) {
    await this.findLogById(id);
    return this.prisma.userLogs.delete({ where: { id } });
  }


  async countLogs(params: {
    userId?: string;
    operation?: UserOperation;
    level?: LogLevel;
    startDate?: Date;
    endDate?: Date;
  }) {
    const { userId, operation, level, startDate, endDate } = params;

    return this.prisma.userLogs.count({
      where: {
        userId,
        operation,
        level,
        createdAt: startDate || endDate ? {
          gte: startDate,
          lte: endDate,
        } : undefined,
      },
    });
  }

  async findRecentLogs(limit = 50) {
    return this.prisma.userLogs.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
