/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { EntityNotFoundExceptionFilter } from './app/shared/filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'mongo';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  // request body validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // Strip data of properties without decorators
      whitelist: true,

      // Throw an error if non-whitelisted values are provided
      forbidNonWhitelisted: true,

      // Throw an error if unknown values are provided
      forbidUnknownValues: true,
    })
  );
  // SwaggerUi Documentation
  const config = new DocumentBuilder()
    .setTitle('Shitpost Generator API')
    .setDescription('Lorem Ipsum here I guess. Who reads this anyway?')
    .setVersion('6.9')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('mongo', app, document);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 MongoDb-based backend application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
