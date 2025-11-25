import { Module, DynamicModule } from '@nestjs/common';
import { buildMetricsConsumers } from '../utils/metrics-consumer.factory';

// importe aqui todos os consumers decorados
import { SensorConsumer } from './consumers/sensor.consumer';
import { AnalysisTelemetryConsumer } from './consumers/analysis-telemetry.consumer';
import { PipelineTelemetryConsumer } from './consumers/pipeline-telemetry.consumer';
import { ErrorHandlerConsumer } from './consumers/error-handler.consumer';
// etc...

const CONSUMERS = [
  SensorConsumer,
  AnalysisTelemetryConsumer,
  PipelineTelemetryConsumer,
  ErrorHandlerConsumer,
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
