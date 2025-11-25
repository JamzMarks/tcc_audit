import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry(retries = Infinity, delay = 5000): Promise<void> {
    while (retries > 0) {
      try {
        await this.$connect();
        console.log("Prisma connected successfully!");
        return;
      } catch (err) {
        console.error("Prisma connection failed, retrying...", err);
        retries--;
        await new Promise(res => setTimeout(res, delay));
      }
    }

    throw new Error("Prisma: all retries failed. Manual intervention needed.");
  }
}
