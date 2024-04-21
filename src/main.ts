import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const APP_PORT = process.env.APP_PORT || 9007;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  app.setGlobalPrefix('api');
  await app.listen(APP_PORT, () => {
    console.log(`Server is listening on port ${APP_PORT}`);
  });
}
bootstrap();
