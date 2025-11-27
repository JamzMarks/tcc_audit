import { Module, OnModuleInit, Inject, Logger } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { METRICS_CONSUMER } from './metrics.decorator';

@Module({})
export class MetricsConsumerModule implements OnModuleInit {
  private readonly logger = new Logger(MetricsConsumerModule.name);

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  async onModuleInit() {
    const providers = this.discovery.getProviders();

    for (const wrapper of providers) {
      const instance = wrapper.instance;
      if (!instance) continue;

      const queue = this.reflector.get<string>(METRICS_CONSUMER, instance.constructor);

      if (!queue) continue; // não tem decorator

      if (!instance.onModuleInit) {
        this.logger.error(
          `${instance.constructor.name} decorado com @MetricsConsumer mas NÃO estende BaseMetricsConsumer`,
        );
        continue;
      }

      this.logger.log(`Registrando MetricsConsumer → ${wrapper.name} na fila: ${queue}`);

      // dispara o onModuleInit do consumer
      instance.onModuleInit();
    }
  }
}
