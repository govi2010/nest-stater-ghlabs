import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './lib/exceptions/custom-exception.filter';
import * as path from 'path';
import { ValidationPipe } from './lib/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
async function bootstrap() {
  config();
  // console.log(JSON.stringify(process.env.JWT_EXPIRATION_DELTA));
  const packageBody = require('../package.json');
  const WWW_ROOT = path.resolve(__dirname, '..', 'www');
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.enableCors();
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION');
  //   next();
  // });
  app.use(bodyParser.json());
  app.use(cors());
  // app.useGlobalFilters(new CustomExceptionFilter(
  //   path.join(WWW_ROOT, 'index.html'),
  // ));
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
}

bootstrap();
