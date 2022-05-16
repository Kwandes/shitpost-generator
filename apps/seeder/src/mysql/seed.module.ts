import { Name, NameTag, Shitpost, ShitpostTag, User } from '@models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config.service';
import { SeedServiceMySql } from './seed.service';
import { NameTagsSeederService } from './services/name-tags.service';
import { NamesSeederService } from './services/names.service';
import { ShitpostTagsSeederService } from './services/shitpost-tags.service';
import { ShitpostsSeederService } from './services/shitposts.service';
import { UsersSeederService } from './services/users.service';

@Module({})
export class SeedModuleMySql {
  public static register(): DynamicModule {
    return {
      module: SeedModuleMySql,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfigMySql()),
        TypeOrmModule.forFeature([User, Shitpost, ShitpostTag, Name, NameTag]),
      ],
      providers: [
        Logger,
        SeedServiceMySql,
        UsersSeederService,
        ShitpostTagsSeederService,
        ShitpostsSeederService,
        NameTagsSeederService,
        NamesSeederService,
      ],
      exports: [SeedServiceMySql],
    };
  }
}
