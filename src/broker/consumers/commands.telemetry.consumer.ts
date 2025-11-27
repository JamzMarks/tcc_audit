import { RabbitMQService } from '@services/rabbit.service';
import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';
import { BaseMetricsConsumer } from '@broker/base-metrics.consumer';


@MetricsConsumer('commands.telemetry')
export class CommandsTelemetryConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService) {
    super(rabbit, 'commands.telemetry');
  }

  async handle(payload: any) {
    console.log('Log de telemetria:', payload);
  }
}