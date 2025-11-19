import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '@services/rabbit.service';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export abstract class AbstractConsumer implements OnModuleInit {
  protected logger = new Logger(this.constructor.name);
  protected abstract queue: string;

  constructor(protected readonly rabbit: RabbitMQService) {}

  async onModuleInit() {
    // AddSetup garante que esse setup será reexecutado em reconexões
    await this.rabbit.consumerChannel.addSetup(async (channel) => {
      // garante que a fila existe
      await channel.assertQueue(this.queue, { durable: true });

      // começa consumir
      await channel.consume(this.queue, async (msg: ConsumeMessage) => {
        if (!msg) return;

        try {
          const payload = JSON.parse(msg.content.toString());
          await this.handle(payload, msg.properties);

          channel.ack(msg);
        } catch (err) {
          this.logger.error(err);
          // Deixa ir para DLQ via policy
          channel.nack(msg, false, false);
        }
      });

      this.logger.log(`Consumer ativo na fila "${this.queue}"`);
    });
  }

  protected abstract handle(payload: any, props: any): Promise<void>;
}
