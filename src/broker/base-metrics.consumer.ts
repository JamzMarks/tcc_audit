import { Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '@services/rabbit.service';
import { ConsumeMessage } from 'amqplib';

export abstract class BaseMetricsConsumer implements OnModuleInit {
  protected logger = new Logger(this.constructor.name);

  constructor(
    protected readonly rabbit: RabbitMQService,
    private readonly queue: string,
  ) {}

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
            // Sem ACK (noAck: true)
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
