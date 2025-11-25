import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class MetricsReportService {
  constructor(private readonly prisma: PrismaService) {}

  // Agrupa por source
  async countBySource() {
    return this.prisma.metricLog.groupBy({
      by: ['source'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }

  // Agrupa por eventType
  async countByEventType() {
    return this.prisma.metricLog.groupBy({
      by: ['eventType'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }

  // Agrupa por routingKey
  async countByRoutingKey() {
    return this.prisma.metricLog.groupBy({
      by: ['routingKey'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }

  // Agrupa por status
  async countByStatus() {
    return this.prisma.metricLog.groupBy({
      by: ['status'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }

  // Quantidade por dia (últimos 30 dias)
  async countDaily(lastDays = 30) {
    const since = new Date(Date.now() - lastDays * 86400000);

    const logs = await this.prisma.metricLog.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: 'asc' },
    });

    // Agrupamento manual para evitar problemas com timezones no Prisma
    const map = new Map<string, number>();

    for (const log of logs) {
      const key = log.createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
      map.set(key, (map.get(key) ?? 0) + 1);
    }

    return Array.from(map, ([day, count]) => ({ day, count }));
  }
}
