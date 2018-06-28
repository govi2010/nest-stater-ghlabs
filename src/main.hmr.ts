import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { ValidationPipe } from './lib/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

declare const module: any;

async function bootstrap() {
  config();

  // console.log(JSON.stringify(process.env));
  const packageBody = require('../package.json');
  const WWW_ROOT = path.resolve(__dirname, '..', 'www');
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle(packageBody.name)
    .setDescription(packageBody.description)
    .setContactEmail(packageBody.author)
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
