import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { MetricsReportService } from './metrics-report.service';

@Controller('metrics')
export class MetricsReportController {
  constructor(private readonly report: MetricsReportService) {}

  @Get('source')
  async getBySource() {
    return this.report.countBySource();
  }

  @Get('event-type')
  async getByEventType() {
    return this.report.countByEventType();
  }

  @Get('routing-key')
  async getByRoutingKey() {
    return this.report.countByRoutingKey();
  }

  @Get('status')
  async getByStatus() {
    return this.report.countByStatus();
  }

  @Get('daily')
  async getDaily(
    @Query('days', ParseIntPipe) days = 30,
  ) {
    return this.report.countDaily(days);
  }
}
