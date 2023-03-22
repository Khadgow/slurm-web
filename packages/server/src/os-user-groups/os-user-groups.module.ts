import { Module } from '@nestjs/common';
import { OsUserGroupsService } from './os-user-groups.service';
import { OsUserGroupsController } from './os-user-groups.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OsUserGroupsController],
  providers: [OsUserGroupsService, PrismaService],
})
export class OsUserGroupsModule {}
