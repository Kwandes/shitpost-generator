import { NameMongo, ShitpostMongo, UserMongo } from '@models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config.service';
import { SeedServiceMongo } from './seed.service';
import { NamesSeederService } from './services/names.service';
import { ShitpostsSeederService } from './services/shitposts.service';
import { UsersSeederService } from './services/users.service';

@Module({})
export class SeedModuleMongo {
  public static register(): DynamicModule {
    return {
      module: SeedModuleMongo,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfigMongoDb()),
        TypeOrmModule.forFeature([UserMongo, ShitpostMongo, NameMongo]),
      ],
      providers: [
        Logger,
        SeedServiceMongo,
        UsersSeederService,
        ShitpostsSeederService,
        NamesSeederService,
      ],
      exports: [SeedServiceMongo],
    };
  }
}
