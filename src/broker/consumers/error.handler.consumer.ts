import { BaseMetricsConsumer } from "@broker/base-metrics.consumer";
import { MetricsConsumer } from "@decorators/metrics-consumer.decorator";
import { MetricsLogService } from "@services/metricsLog.service";
import { RabbitMQService } from "@services/rabbit.service";

@MetricsConsumer('error.handler')
export class ErrorHandlerConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'error.handler',
      routingKey: props?.routingKey,
      payload,
      source: 'error',
      eventType: 'handler',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}
