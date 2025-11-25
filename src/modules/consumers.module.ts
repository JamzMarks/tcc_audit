import { Module, Global } from '@nestjs/common';
import { RabbitMQModule } from './rabbit.module';

import { SensorInjetorConsumer } from '@broker/sensor-injetor.consumer';
import { ErrorHandlerConsumer } from '@broker/error-handler.consumer';


@Global()
@Module({
  imports: [RabbitMQModule],
  providers: [ SensorInjetorConsumer, ErrorHandlerConsumer],
  exports: [],
})
export class ConsumersModule {}