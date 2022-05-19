/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { EntityNotFoundExceptionFilter } from './app/shared/filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'neo';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
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
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3335;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
