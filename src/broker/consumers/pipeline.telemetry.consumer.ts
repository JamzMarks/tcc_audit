import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';


@MetricsConsumer('pipeline.telemetry')
export class PipelineTelemetryConsumer {
  async handle(payload: any) {
    console.log('Log de telemetria pipeline:', payload);
  }
}
