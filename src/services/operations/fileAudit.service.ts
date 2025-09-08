import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { v7 as uuid7 } from 'uuid';
import { FileOperation, LogLevel } from 'generated/prisma';


@Injectable()
export class FileAuditService {
  constructor(private prisma: PrismaService) {}

  async createLog(params: {
    userId: string;              
    email: string;
    operation: FileOperation;
    level?: LogLevel;
    description?: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    folderId?: string;
  }) {
    return this.prisma.filesLogs.create({
      data: {
        id: uuid7(),
        userId: params.userId,
        email: params.email,
        operation: params.operation,
        level: params.level ?? LogLevel.INFO,
        description: params.description,
        fileName: params.fileName,
        fileSize: params.fileSize,
        fileType: params.fileType,
        folderId: params.folderId,
      },
    });
  }


  async findLogs(userId?: string) {
    return this.prisma.filesLogs.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findLogById(id: string) {
    const log = await this.prisma.filesLogs.findUnique({
      where: { id },
    });
    if (!log) throw new NotFoundException(`File log with id ${id} not found`);
    return log;
  }

  async updateLog(
    id: string,
    data: {
      description?: string;
      level?: LogLevel;
      fileName?: string;
      fileSize?: number;
      fileType?: string;
      folderId?: string;
    },
  ) {
    await this.findLogById(id);
    return this.prisma.filesLogs.update({
      where: { id },
      data,
    });
  }

  // async deleteLog(id: string) {
  //   await this.findLogById(id);
  //   return this.prisma.filesLogs.delete({
  //     where: { id },
  //   });
  // }
}
