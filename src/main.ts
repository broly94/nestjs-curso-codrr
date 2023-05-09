import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constans';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS);

  app.use(morgan('dev'));

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
