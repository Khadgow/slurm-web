import { Module } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ClusterController } from './cluster.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ClusterController],
  providers: [ClusterService, PrismaService],
})
export class ClusterModule {}
