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
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.warn(`Say "Ya Yeet" three times to summon the Y̷̼͊̄͠ẽ̵̡̢̯͈͔̻̮̻͖̪͈͎̙͉̟͌̉̿͆̆͘é̸̛̥̩̟̳̱͛̊̒̇̚t̴̖̽̂ú̵̲̫̲̻͉̋͛̈́̏̍̂̎́̍͝s̶̜̏͂͛ ̵̧̤̘͕̳̘̥̙̞̉̈́̀͗͒͐͋C̸͙̲̰͕̍̋͂͛̾͗̒̀A̶̫̬̫̼͎̗̘̘̭̠̽̌̏͌̓̌͑͜͜Y̵̢̛̮̥̗̰̫̻̦̞͊̒͛͋̋͊̽͑͒͐͂̈́̀ ̷̨̼̙̩̤͚̓̓͊͝͠M̷̪̐ą̵̫̙̦̳̲̑̾̔̈́͆̊͐̑͘͠ͅx̵̡̤̟̰̲̭̩͊̎̍͂̓̽̾͠i̸̛̲̭̼͐͆͒̊̍̈́̇̌̆́͐͘̕ú̷̱̳͓̪̙̆́͠m̴̨̗̼͈͉̭̜͔̬̻̣̱̠͈̌̏͑͆́͠ͅù̷̢̻̥̥̫̬s̵̻̗̝̞͉͚̙͙̝̱͈̱͔̉͆̂̈̉̏͐͝͝`);
}

bootstrap();
