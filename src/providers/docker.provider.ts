import Docker from 'dockerode';

export const DockerProvider = {
  provide: 'DOCKER',
  useFactory: () => {
    return new Docker({
      socketPath: '/var/run/docker.sock',
    });
  },
};
