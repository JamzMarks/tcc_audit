import { BaseMetricsConsumer } from '@broker/base-metrics.consumer';
import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';
import { RabbitMQService } from '@services/rabbit.service';


@MetricsConsumer('telemetry.logger')
export class TelemetryLoggerConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService) {
    super(rabbit, 'telemetry.logger');
  }

  async handle(payload: any) {
    console.log('Log de telemetria logger:', payload);
  }
}
