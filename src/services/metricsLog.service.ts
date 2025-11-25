import { PrismaService } from '@/infra/prisma/prisma.service';

@Injectable()
export class MetricsLogService {
  constructor(private readonly prisma: PrismaService) {}

  async saveLog(data: {
    queue: string;
    routingKey?: string;
    payload: any;
    source?: string;
    eventType?: string;
    correlationId?: string;
    status?: string;
    numericValue?: number;
  }) {
    return this.prisma.metricLog.create({ data });
  }
}
