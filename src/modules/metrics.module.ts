import { DynamicModule, Module, Logger, Type } from '@nestjs/common';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { METRICS_CONSUMER } from '@decorators/metrics-consumer.decorator';

@Module({})
export class MetricsConsumerModule {
  private static readonly logger = new Logger(MetricsConsumerModule.name);

  static register(): DynamicModule {
    const dir = MetricsConsumerModule.resolveConsumersDir();
    const consumers = this.loadConsumers(dir);

    this.logger.log(`🔍 Encontrados ${consumers.length} consumers.`);

    return {
      module: MetricsConsumerModule,
      providers: consumers,
      exports: consumers,
    };
  }

  /** Resolve correto tanto para src quanto dist */
  private static resolveConsumersDir() {
    // quando compilado, __dirname → dist/broker
    const distPath = join(__dirname, 'consumers');
    if (existsSync(distPath)) return distPath;

    // quando em dev (ts-node), pegar src/
    const srcPath = join(process.cwd(), 'src/broker/consumers');
    if (existsSync(srcPath)) return srcPath;

    throw new Error(
      `❌ Pasta de consumers não encontrada:
        - ${distPath}
        - ${srcPath}`,
    );
  }

  private static loadConsumers(dir: string) {
    const files = readdirSync(dir);

    const consumers: Type<any>[] = []; // <-- TIPO CORRETO

    for (const file of files) {
      if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

      const moduleExports = require(join(dir, file));

      for (const key of Object.keys(moduleExports)) {
        const exported = moduleExports[key];

        // precisa ser classe (constructor)
        if (typeof exported !== 'function') continue;

        const metadata = Reflect.getMetadata(METRICS_CONSUMER, exported);
        if (metadata) {
          this.logger.log(`✔ Achado consumer: ${exported.name}`);
          consumers.push(exported);
        }
      }
    }

    return consumers;
  }
}
