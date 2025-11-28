import { Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '@services/rabbit.service';
import { ConsumeMessage } from 'amqplib';
import { METRICS_CONSUMER, MetricsConsumerOptions } from '@decorators/metrics-consumer.decorator';

export abstract class BaseMetricsConsumer implements OnModuleInit {
  protected logger = new Logger(this.constructor.name);
  private queue: string;

  constructor(
    protected readonly rabbit: RabbitMQService,
  ) {
    const metadata = Reflect.getMetadata(
      METRICS_CONSUMER,
      this.constructor,
    ) as MetricsConsumerOptions;

    if (!metadata?.queue) {
      throw new Error(
        `${this.constructor.name} não possui @MetricsConsumer com nome da fila.`,
      );
    }

    this.queue = metadata.queue;
  }

  async onModuleInit() {
    await this.rabbit.consumerChannel.addSetup(async (channel) => {
      await channel.assertQueue(this.queue, { durable: true });

      await channel.consume(
        this.queue,
        async (msg: ConsumeMessage) => {
          if (!msg) return;

          try {
            const payload = JSON.parse(msg.content.toString());
            await this.handle(payload, msg.properties);
          } catch (err) {
            this.logger.error(`Erro na fila ${this.queue}:`, err);
          }
        },
        { noAck: true },
      );

      this.logger.log(`Metrics consumer ativo na fila "${this.queue}"`);
    });
  }

  abstract handle(payload: any, props: any): Promise<void>;
}
