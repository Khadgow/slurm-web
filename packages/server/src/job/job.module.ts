import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { PrismaService } from '../prisma.service';
import { ClusterService } from '../cluster/cluster.service';

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService, ClusterService],
})
export class JobModule {}
