import { RabbitMQService } from '@services/rabbit.service';
import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';
import { BaseMetricsConsumer } from '@broker/base-metrics.consumer';


@MetricsConsumer('pipeline.telemetry')
export class PipelineTelemetryConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService) {
    super(rabbit, 'pipeline.telemetry');
  }

  async handle(payload: any) {
    console.log('Log de telemetria pipeline:', payload);
  }
}
