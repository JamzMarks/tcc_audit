
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Audit Service API')
    .setDescription('API para gerenciar auditorias')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.enableCors({
    origin: ['https://localhost:3000', 'https://tccdashboard.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
      queue: 'audit_logs_queue',
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 5000);
  console.log(`Audit service running on port ${process.env.PORT ?? 5000}`);
}
bootstrap();
