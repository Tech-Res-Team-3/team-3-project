import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/** Service to manage Prisma database connections */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /** Connect to the database when the module initializes */
  async onModuleInit() {
    await this.$connect();
  }

  /** Disconnect from the database when the module is destroyed */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
