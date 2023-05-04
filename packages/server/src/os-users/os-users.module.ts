import { Module } from '@nestjs/common';
import { OsUsersService } from './os-users.service';
import { OsUsersController } from './os-users.controller';
import { PrismaService } from '../prisma.service';
import { OsUserGroupsService } from '../os-user-groups/os-user-groups.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [OsUsersController],
  providers: [OsUsersService, PrismaService, OsUserGroupsService],
  imports: [AuthModule],
})
export class OsUsersModule {}
