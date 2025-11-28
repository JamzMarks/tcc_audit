import { Injectable } from '@nestjs/common';
const Docker = require('dockerode');

@Injectable()
export class DockerProvider {
  public client: any;

  constructor() {
    this.client = new Docker({
      socketPath: '/var/run/docker.sock',
    });
  }
}
