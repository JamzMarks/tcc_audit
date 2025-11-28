import { RabbitMQService } from '@services/rabbit.service';
import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';
import { BaseMetricsConsumer } from '@broker/base-metrics.consumer';
import { MetricsLogService } from '@services/metricsLog.service';

@MetricsConsumer('sensor.to.injetor')
export class SensorToInjectorConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'sensor.to.injetor',
      routingKey: props?.routingKey,
      payload,
      source: 'sensor',
      eventType: 'to.injector',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}
