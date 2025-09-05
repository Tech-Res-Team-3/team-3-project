import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './providers/admins.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
