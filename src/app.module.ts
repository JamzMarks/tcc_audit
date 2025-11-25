import { LogsController } from '@controllers/logs.controller';
import { ConsumersModule } from '@modules/consumers.module';
import { RabbitMQModule } from '@modules/rabbit.module';
import { WebSocketModule } from '@modules/webSocket.module';
import { Module } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';


@Module({
  imports: [RabbitMQModule, WebSocketModule, ConsumersModule],
  controllers: [LogsController],
  providers: [PrismaService],
})
export class AppModule {}
