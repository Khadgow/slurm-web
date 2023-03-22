import { Controller, Get, Param } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('jobs')
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
