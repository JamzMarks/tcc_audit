import 'reflect-metadata';

export const METRICS_CONSUMER = 'METRICS_CONSUMER';

/**
 * Decorator que marca uma classe como consumer de métricas
 * e armazena o nome da fila para injeção dinâmica.
 *
 * @param queue - Nome da fila no RabbitMQ
 */
export function MetricsConsumer(queue: string): ClassDecorator {
  return (target) => {
    // Adiciona a metadata com o nome da fila
    Reflect.defineMetadata(METRICS_CONSUMER, queue, target);
  };
}
