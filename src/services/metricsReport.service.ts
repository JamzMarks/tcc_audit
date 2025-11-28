import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class MetricsReportService {
  constructor(private readonly prisma: PrismaService) {}

  async countBySource() {
    return this.prisma.metricLog.groupBy({
      by: ['source'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }

  async countByEventType() {
    return this.prisma.metricLog.groupBy({
      by: ['eventType'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }

  async countByRoutingKey() {
    return this.prisma.metricLog.groupBy({
      by: ['routingKey'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }


  // Quantidade por dia (últimos 30 dias)
  async countDaily(lastDays = 30) {
    const since = new Date(Date.now() - lastDays * 86400000);

    const logs = await this.prisma.metricLog.findMany({
      where: {
        receivedAt: { gte: since },
      },
      select: { receivedAt: true },
    });

    const map = new Map<string, number>();

    for (const log of logs) {
      const day = log.receivedAt.toISOString().substring(0, 10); // YYYY-MM-DD
      map.set(day, (map.get(day) ?? 0) + 1);
    }

    return Array.from(map, ([day, count]) => ({ day, count }));
  }
}
