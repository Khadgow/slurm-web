import { Controller, Get } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Кластеры')
@Controller('clusters')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}
  @Get()
  findAll() {
    return this.clusterService.findAll();
  }
}
