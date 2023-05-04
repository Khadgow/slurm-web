import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@ApiTags('Работы')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get()
  findAll() {
    return this.jobService.getLocalclusterJobs();
  }

  @Get('/:name')
  getJobsByClusterName(@Param() params) {
    return this.jobService.findByClusterName(params.name);
  }
}
