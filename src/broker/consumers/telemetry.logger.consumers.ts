import { BaseMetricsConsumer } from '@broker/base-metrics.consumer';
import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';
import { RabbitMQService } from '@services/rabbit.service';
import { MetricsLogService } from '@services/metricsLog.service';

@MetricsConsumer('logs')
export class LogsConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'logs',
      routingKey: props?.routingKey,
      payload,
      source: 'logs',
      eventType: 'log',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}

@MetricsConsumer('system_events')
export class SystemEventsConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'system_events',
      routingKey: props?.routingKey,
      payload,
      source: 'system',
      eventType: 'event',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}
