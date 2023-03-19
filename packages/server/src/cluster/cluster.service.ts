import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClusterService {
  constructor(private prisma: PrismaService) {}

  getClusters() {
    return this.prisma.cluster.findMany({});
  }

  getClusterByName(name: string) {
    return this.prisma.cluster.findFirst({
      where: {
        name,
      },
    });
  }
}
