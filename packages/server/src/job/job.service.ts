import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClusterService } from '../cluster/cluster.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(
    private prisma: PrismaService,
    private clusterService: ClusterService,
  ) {}

  getLocalclusterJobs() {
    return this.prisma.localclusterJob.findMany({});
  }

  async getJobsByClusterName(name: string) {
    const res = await this.clusterService.getClusterByName(name);
    if (res) {
      const tableName = `${name}_job_table`;
      return this.prisma.$queryRaw`SELECT * FROM ${Prisma.raw(tableName)}`;
    }
    return null;
  }
}
