import { Module } from '@nestjs/common';
import { ClusterModule } from './cluster/cluster.module';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ClusterModule, JobModule, UserModule],
})
export class AppModule {}
