import { Injectable } from '@nestjs/common';
import { AbstractConsumer } from './abstract.consumer';

@Injectable()
export class SensorInjetorConsumer extends AbstractConsumer {
  protected queue = 'sensor.to.injetor';

  async handle(payload: any) {
    console.log('[sensor.to.injetor] received:', payload);
    // processa lógica
  }
}
