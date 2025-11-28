import { Module, DynamicModule } from '@nestjs/common';
import { buildMetricsConsumers } from '../utils/metrics-consumer.factory';
import { AnalysisTelemetryConsumer } from '@broker/consumers/analysis-telemetry.consumer';
import { PipelineTelemetryConsumer } from '@broker/consumers/pipeline.telemetry.consumer';
import { CommandsTelemetryConsumer } from '@broker/consumers/commands.telemetry.consumer';
import { TelemetryLoggerConsumer } from '@broker/consumers/telemetry.logger.consumers';
// importe aqui todos os consumers decorados

// etc...

const CONSUMERS = [
  TelemetryLoggerConsumer,
  AnalysisTelemetryConsumer,
  PipelineTelemetryConsumer,
  CommandsTelemetryConsumer,
  // adicione novos aqui
];

@Module({})
export class MetricsModule {
  static register(): DynamicModule {
    return {
      module: MetricsModule,
      providers: [
        ...buildMetricsConsumers(CONSUMERS),
      ],
      exports: [],
    };
  }
}
