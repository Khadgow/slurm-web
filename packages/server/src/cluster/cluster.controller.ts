import { Controller, Get } from '@nestjs/common';
import { ClusterService } from './cluster.service';

@Controller('cluster')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}
  @Get()
  getAll() {
    return this.clusterService.getClusters();
  }
}
