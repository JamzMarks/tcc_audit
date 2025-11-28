import 'reflect-metadata';

export const METRICS_CONSUMER = Symbol('METRICS_CONSUMER');

export interface MetricsConsumerOptions {
  queue: string;
  routingKey?: string;
}

export function MetricsConsumer(options: string | MetricsConsumerOptions): ClassDecorator {
  const normalized: MetricsConsumerOptions =
    typeof options === 'string'
      ? { queue: options }
      : options;

  return (target: any) => {
    Reflect.defineMetadata(METRICS_CONSUMER, normalized, target);
  };
}
