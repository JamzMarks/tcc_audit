import { Module, Global } from '@nestjs/common';
import { RabbitMQModule } from './rabbit.module';
import { AbstractConsumer } from '@broker/abstract.consumer';
import { SensorInjetorConsumer } from '@broker/sensor-injetor.consumer';
import { ErrorHandlerConsumer } from '@broker/error-handler.consumer';

@Global()
@Module({
  imports: [RabbitMQModule],
  providers: [AbstractConsumer, SensorInjetorConsumer, ErrorHandlerConsumer],
  exports: [AbstractConsumer],
})
export class ConsumersModule {}