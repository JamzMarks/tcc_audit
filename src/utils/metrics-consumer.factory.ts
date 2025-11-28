import { Provider, Type } from '@nestjs/common';
import { METRICS_CONSUMER } from '../decorators/metrics-consumer.decorator';

import { RabbitMQService } from '@services/rabbit.service';
import { BaseMetricsConsumer } from '@broker/base-metrics.consumer';

export function buildMetricsConsumers(consumerClasses: Type<any>[]): Provider[] {
  return consumerClasses.map((ConsumerClass) => {
    const queue = Reflect.getMetadata(METRICS_CONSUMER, ConsumerClass);

    if (!queue) {
      throw new Error(
        `Classe ${ConsumerClass.name} não possui @MetricsConsumer(queue)`,
      );
    }

    return {
      provide: ConsumerClass,
      useFactory: (rabbit: RabbitMQService) => {
        // instancia a classe com BaseMetricsConsumer wrapper
        const instance = new ConsumerClass();
        const base = new (class extends BaseMetricsConsumer {
          constructor() {
            super(rabbit, queue);
          }
          async handle(payload: any, props: any) {
            return instance.handle(payload, props);
          }
        })();

        return base;
      },
      inject: [RabbitMQService],
    };
  });
}
