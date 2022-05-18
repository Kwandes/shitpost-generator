import {
  DatabaseRegistry,
  DrivineModule,
  DrivineModuleOptions,
} from '@liberation-data/drivine';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      // connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv('NEO4J')],
      connectionProviders: [
        DatabaseRegistry.getInstance()
          .builder()
          .withProperties(configService.getConnectionProperties())
          .protocol('neo4j')
          .register(),
      ],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
