import { Controller, Get, Param } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get()
  getAll() {
    return this.jobService.getLocalclusterJobs();
  }

  @Get('/:name')
  getJobsByClusterName(@Param() params) {
    return this.jobService.getJobsByClusterName(params.name);
  }
}
