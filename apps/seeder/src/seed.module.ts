import { Name, NameTag, Shitpost, ShitpostTag, User } from '@models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config.service';
import { SeedService } from './seed.service';
import { NameTagsSeederService } from './services/name-tags.service';
import { NamesSeederService } from './services/names.service';
import { ShitpostTagsSeederService } from './services/shitpost-tags.service';
import { ShitpostsSeederService } from './services/shitposts.service';
import { UsersSeederService } from './services/users.service';

@Module({})
export class SeedModule {
  public static register(): DynamicModule {
    return {
      module: SeedModule,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Shitpost, ShitpostTag, Name, NameTag]),
      ],
      providers: [
        Logger,
        SeedService,
        UsersSeederService,
        ShitpostTagsSeederService,
        ShitpostsSeederService,
        NameTagsSeederService,
        NamesSeederService,
      ],
      exports: [SeedService],
    };
  }
}
