import { DockerController } from '@controllers/docker.controller';
import { LogsController } from '@controllers/logs.controller';
import { ConsumersModule } from '@modules/consumers.module';
import { RabbitMQModule } from '@modules/rabbit.module';
import { WebSocketModule } from '@modules/webSocket.module';
import { Module } from '@nestjs/common';
import { DockerService } from '@services/docker.service';
import { PrismaService } from '@services/prisma.service';


@Module({
  imports: [RabbitMQModule, WebSocketModule, ConsumersModule,
    MetricsModule.register()
  ],
  controllers: [LogsController, DockerController],
  providers: [PrismaService, DockerProvider, DockerService],
})
export class AppModule {}
