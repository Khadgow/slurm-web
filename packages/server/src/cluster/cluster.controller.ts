import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@ApiTags('Кластеры')
@Controller('clusters')
@UseGuards(JwtAuthGuard)
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}
  @Get()
  findAll() {
    return this.clusterService.findAll();
  }
}
