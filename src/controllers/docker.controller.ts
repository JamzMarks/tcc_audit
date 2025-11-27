import { Controller, Get, Param, Post } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
  constructor(private docker: DockerService) {}

  @Get('containers')
  list() {
    return this.docker.listContainers();
  }

  @Post('start/:id')
  start(@Param('id') id: string) {
    return this.docker.start(id);
  }

  @Post('stop/:id')
  stop(@Param('id') id: string) {
    return this.docker.stop(id);
  }
}
