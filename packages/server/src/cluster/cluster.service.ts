import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClusterService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cluster.findMany({});
  }

  findOne(name: string) {
    return this.prisma.cluster.findFirst({
      where: {
        name,
      },
    });
  }
}
