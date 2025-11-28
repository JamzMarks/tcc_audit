import {
  Controller,
  Get,
  Query,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly prisma: PrismaService) {}

  // GET /logs
  // Filtros avançados: source, eventType, routingKey, status, correlationId
  // Paginação: ?page=1&pageSize=20
  @Get()
  async list(
    @Query('source') source?: string,
    @Query('eventType') eventType?: string,
    @Query('routingKey') routingKey?: string,
    @Query('status') status?: string,
    @Query('correlationId') correlationId?: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '20',
  ) {
    const pageNum = parseInt(page);
    const sizeNum = parseInt(pageSize);
    if (isNaN(pageNum) || isNaN(sizeNum))
      throw new BadRequestException('page e pageSize devem ser números');

    const where: any = {};

    if (source) where.source = source;
    if (eventType) where.eventType = eventType;
    if (routingKey) where.routingKey = routingKey;
    if (status) where.status = status;
    if (correlationId) where.correlationId = correlationId;

    const [data, total] = await Promise.all([
      this.prisma.metricLog.findMany({
        where,
        skip: (pageNum - 1) * sizeNum,
        take: sizeNum,
      }),
      this.prisma.metricLog.count({ where }),
    ]);

    return {
      total,
      page: pageNum,
      pageSize: sizeNum,
      data,
    };
  }

  // GET /logs/:id
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const log = await this.prisma.metricLog.findUnique({
      where: { id },
    });

    if (!log) throw new BadRequestException('Log não encontrado');

    return log;
  }

  // DELETE /logs/:id
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.metricLog.delete({
      where: { id },
    });

    return { success: true };
  }

  // DELETE /logs (com filtros opcionais)
  // Permite apagar por período, source etc
  @Delete()
  async deleteMany(
    @Query('source') source?: string,
    @Query('eventType') eventType?: string,
    @Query('status') status?: string,
    @Query('olderThanDays') olderThanDays?: string,
  ) {
    const where: any = {};

    if (source) where.source = source;
    if (eventType) where.eventType = eventType;
    if (status) where.status = status;

    // Permite limpar logs antigos: /logs?olderThanDays=30
    if (olderThanDays) {
      const days = parseInt(olderThanDays);
      if (isNaN(days)) throw new BadRequestException('olderThanDays deve ser número');

      where.createdAt = {
        lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      };
    }

    const { count } = await this.prisma.metricLog.deleteMany({ where });

    return { deleted: count };
  }
}
