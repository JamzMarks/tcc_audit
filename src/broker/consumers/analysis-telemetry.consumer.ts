import { BaseMetricsConsumer } from "@broker/base-metrics.consumer";
import { MetricsConsumer } from "@decorators/metrics-consumer.decorator";
import { MetricsLogService } from "@services/metricsLog.service";
import { RabbitMQService } from "@services/rabbit.service";

@MetricsConsumer('analysis.to.orchestrator')
export class AnalysisTelemetryConsumer extends BaseMetricsConsumer {
  constructor(
    rabbit: RabbitMQService,
    private readonly logService: MetricsLogService,
  ) {
    super(rabbit);
  }

  async handle(payload: any, meta: any) {
    console.log('Processando analysis.to.orchestrator:', payload);

    await this.logService.saveLog({
      queue: 'analysis.to.orchestrator',
      routingKey: meta?.routingKey,
      payload,
      source: 'analysis',
      eventType: 'telemetry',
      correlationId: payload?.correlationId,
      numericValue: payload?.value ?? null,
      status: 'received',
    });
  }
}


@MetricsConsumer('orchestrator.to.iot')
export class OrchestratorToIoTConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'orchestrator.to.iot',
      routingKey: props?.routingKey,
      payload,
      source: 'orchestrator',
      eventType: 'to.iot',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}

@MetricsConsumer('commands.telemetry')
export class CommandsTelemetryConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'commands.telemetry',
      routingKey: props?.routingKey,
      payload,
      source: 'commands',
      eventType: 'telemetry',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}


@MetricsConsumer('orquestrador')
export class OrquestradorConsumer extends BaseMetricsConsumer {
  constructor(rabbit: RabbitMQService, private log: MetricsLogService) {
    super(rabbit);
  }

  async handle(payload: any, props: any) {
    await this.log.saveLog({
      queue: 'orquestrador',
      routingKey: props?.routingKey,
      payload,
      source: 'orquestrador',
      eventType: 'generic',
      correlationId: payload?.correlationId,
      status: 'received',
    });
  }
}