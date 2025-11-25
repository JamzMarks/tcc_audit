import { MetricsConsumer } from '../../decorators/metrics-consumer.decorator';


@MetricsConsumer('telemetry.logger')
export class TelemetryLoggerConsumer {
  async handle(payload: any) {
    console.log('Log de telemetria:', payload);
  }
}
