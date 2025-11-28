import { RabbitMQService } from '@services/rabbit.service';
import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';
import { BaseMetricsConsumer } from '@broker/base-metrics.consumer';
import { MetricsLogService } from '@services/metricsLog.service';



@MetricsConsumer('injector_queue')
export class InjectorQueueConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'injector_queue',
      routingKey: props?.routingKey,
      payload,
      source: 'injector',
      eventType: 'generic',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}

@MetricsConsumer('pipeline.telemetry')
export class PipelineTelemetryConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'pipeline.telemetry',
      routingKey: props?.routingKey,
      payload,
      source: 'pipeline',
      eventType: 'telemetry',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}

