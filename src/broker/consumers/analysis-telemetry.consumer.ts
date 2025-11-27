import { MetricsConsumer } from "@decorators/metrics-consumer.decorator";
import { BaseMetricsConsumer } from "./base-metrics.consumer";
import { MetricsLogService } from "@services/metricsLog.service";
import { RabbitMQService } from "@services/rabbit.service";

@MetricsConsumer('analysis.telemetry')
export class AnalysisTelemetryConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private readonly logService: MetricsLogService) {
    super(rabbit, 'analysis.telemetry');
  }

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