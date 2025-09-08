import { Module } from '@nestjs/common';
import { UserAuditService } from './services/operations/userAudit.service';
import { UserAuditController } from './controllers/app.controller';

@Module({
  imports: [],
  controllers: [UserAuditController],
  providers: [UserAuditService],
})
export class AppModule {}
