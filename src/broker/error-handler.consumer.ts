import { Injectable } from '@nestjs/common';
import { AbstractConsumer } from './abstract.consumer';

@Injectable()
export class ErrorHandlerConsumer extends AbstractConsumer {
  protected queue = 'error.handler';

  async handle(payload: any) {
    console.error('[error.handler] ERROR EVENT:', payload);
    // salvar log, enviar alerta etc
  }
}
