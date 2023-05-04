import { Module } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ClusterController } from './cluster.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [ClusterController],
  providers: [ClusterService, PrismaService],
  imports: [AuthModule],
})
export class ClusterModule {}
