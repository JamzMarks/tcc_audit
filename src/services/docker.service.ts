import { Inject, Injectable } from '@nestjs/common';
import { DockerProvider } from '../providers/docker.provider';

@Injectable()
export class DockerService {
  constructor(private dockerProvider: DockerProvider) {}

  listContainers() {
    return this.dockerProvider.client.listContainers({ all: true });
  }

  async start(id: string) {
    return this.dockerProvider.client.getContainer(id).start();
  }

  async stop(id: string) {
    return this.dockerProvider.client.getContainer(id).stop();
  }
}
