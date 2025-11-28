import { Module, OnModuleInit, Logger, DynamicModule } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { METRICS_CONSUMER } from '@decorators/metrics-consumer.decorator';

@Module({})
export class MetricsConsumerModule implements OnModuleInit {
  private readonly logger = new Logger(MetricsConsumerModule.name);

  constructor(private readonly discovery: DiscoveryService) {}

  static register(): DynamicModule {
    return {
      module: MetricsConsumerModule,
      imports: [DiscoveryModule],
    };
  }

  async onModuleInit() {
    const providers = this.discovery.getProviders();

    for (const wrapper of providers) {
      const instance = wrapper.instance;
      if (!instance) continue;

      const queue = Reflect.getMetadata(METRICS_CONSUMER, instance.constructor);

      if (!queue) continue; // não tem decorator

      if (typeof instance.onModuleInit !== 'function') {
        this.logger.error(
          `❌ ${instance.constructor.name} tem @MetricsConsumer mas NÃO estende BaseMetricsConsumer`,
        );
        continue;
      }

      this.logger.log(
        `✔ Registrando MetricsConsumer → ${instance.constructor.name} na fila "${queue}"`,
      );

      // chama o onModuleInit do consumer (consume da fila)
      await instance.onModuleInit();
    }
  }
}
