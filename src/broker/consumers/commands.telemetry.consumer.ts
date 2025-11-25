import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';


@MetricsConsumer('commands.telemetry')
export class CommandsTelemetryConsumer {
  async handle(payload: any) {
    console.log('Log de telemetria:', payload);
  }
}