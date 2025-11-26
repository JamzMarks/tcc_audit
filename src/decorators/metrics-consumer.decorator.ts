import 'reflect-metadata';

export const METRICS_CONSUMER = Symbol('METRICS_CONSUMER');

export function MetricsConsumer(queue: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(METRICS_CONSUMER, queue, target);
  };
}
