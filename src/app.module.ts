import { DockerController } from '@controllers/docker.controller';
import { LogsController } from '@controllers/logs.controller';

import { RabbitMQModule } from '@modules/rabbit.module';
import { WebSocketModule } from '@modules/webSocket.module';
import { Module } from '@nestjs/common';
import { DockerService } from '@services/docker.service';
import { PrismaService } from '@services/prisma.service';
import { DockerProvider } from './providers/docker.provider';
import { MetricsConsumerModule } from '@modules/metrics.module';


@Module({
  imports: [RabbitMQModule, WebSocketModule,
    MetricsConsumerModule.register()
  ],
  controllers: [LogsController, DockerController],
  providers: [PrismaService, DockerProvider, DockerService],
})
export class AppModule {}
