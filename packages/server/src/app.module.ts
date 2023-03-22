import { Module } from '@nestjs/common';
import { ClusterModule } from './cluster/cluster.module';
import { JobModule } from './job/job.module';
import { WebUsersModule } from './web-users/web-users.module';
import { OsUsersModule } from './os-users/os-users.module';
import { OsUserGroupsModule } from './os-user-groups/os-user-groups.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClusterModule,
    JobModule,
    WebUsersModule,
    OsUserGroupsModule,
    OsUsersModule,
    AuthModule,
  ],
})
export class AppModule {}
