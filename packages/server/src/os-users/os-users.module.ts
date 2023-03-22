import { Module } from '@nestjs/common';
import { OsUsersService } from './os-users.service';
import { OsUsersController } from './os-users.controller';
import { PrismaService } from '../prisma.service';
import { OsUserGroupsService } from '../os-user-groups/os-user-groups.service';

@Module({
  controllers: [OsUsersController],
  providers: [OsUsersService, PrismaService, OsUserGroupsService],
})
export class OsUsersModule {}
