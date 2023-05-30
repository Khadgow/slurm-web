import { Module } from '@nestjs/common';
import { ClusterModule } from './cluster/cluster.module';
import { JobModule } from './job/job.module';
import { WebUsersModule } from './web-users/web-users.module';
import { OsUsersModule } from './os-users/os-users.module';
import { OsUserGroupsModule } from './os-user-groups/os-user-groups.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SshModule } from './ssh/ssh.module';

@Module({
  imports: [
    ClusterModule,
    JobModule,
    WebUsersModule,
    OsUserGroupsModule,
    OsUsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SshModule,
  ],
})
export class AppModule {}
