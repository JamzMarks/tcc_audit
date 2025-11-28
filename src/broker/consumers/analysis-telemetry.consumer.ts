import { MetricsConsumer } from "@decorators/metrics-consumer.decorator";
import { MetricsLogService } from "@services/metricsLog.service";

@MetricsConsumer('analysis.telemetry')
export class AnalysisTelemetryConsumer {
  constructor(private readonly logService: MetricsLogService) {}

  async handle(payload: any, meta: { routingKey?: string }) {
    console.log('Processando analysis telemetry:', payload);

    await this.logService.saveLog({
      queue: 'analysis.telemetry',
      routingKey: meta?.routingKey,
      payload,
      source: 'analysis',
      eventType: 'telemetry',
      correlationId: payload?.correlationId,
      numericValue: payload?.value ?? null,
      status: 'received',
    });
  }
}
