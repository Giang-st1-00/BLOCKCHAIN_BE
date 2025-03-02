import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '~config/env.config';
import { Bootstrap } from '~core/bootstraps/bootstraps';


env.ROOT_PATH = __dirname;

async function startApp(): Promise<void> {
  const bootstrap = new Bootstrap();
  await bootstrap.initApp();
  bootstrap.initCors();
  bootstrap.initPipes();
  bootstrap.initSwagger();
  await bootstrap.start();
}


startApp()
    .then(() => console.log(`Server is running on port ${env.APP_PORT}`))
    .catch(console.error);
