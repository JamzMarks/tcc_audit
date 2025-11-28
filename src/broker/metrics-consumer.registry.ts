// metrics-consumer.registry.ts
import 'reflect-metadata';


export class MetricsConsumerRegistry {
  private static consumers: any[] = [];

  static register(target: any) {
    this.consumers.push(target);
  }

  static getConsumers() {
    return this.consumers;
  }
}
