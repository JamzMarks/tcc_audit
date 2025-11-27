import { Inject, Injectable } from '@nestjs/common';
import Docker from 'dockerode';

@Injectable()
export class DockerService {
  constructor(@Inject('DOCKER') private docker: Docker) {}

  listContainers() {
    return this.docker.listContainers({ all: true });
  }

  async start(id: string) {
    const container = this.docker.getContainer(id);
    return container.start();
  }

  async stop(id: string) {
    const container = this.docker.getContainer(id);
    return container.stop();
  }
}
