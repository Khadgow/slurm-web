import { Module } from '@nestjs/common';
import { OsUserGroupsService } from './os-user-groups.service';
import { OsUserGroupsController } from './os-user-groups.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [OsUserGroupsController],
  providers: [OsUserGroupsService, PrismaService],
  imports: [AuthModule],
})
export class OsUserGroupsModule {}
