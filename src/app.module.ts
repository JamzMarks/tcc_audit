import { Module } from '@nestjs/common';

import { UsersAuditController } from '@controllers/userAudit.controller';
import { UsersAuditService } from '@services/usersAudit.service';
import { PrismaService } from '@services/prisma.service';


@Module({
  imports: [],
  controllers: [UsersAuditController],
  providers: [UsersAuditService, PrismaService],
})
export class AppModule {}
