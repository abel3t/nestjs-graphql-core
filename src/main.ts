import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadFastify } from 'graphql-upload';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());
  // app.use(graphqlUploadFastify({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(8080, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
