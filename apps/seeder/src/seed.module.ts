import { Name, Shitpost, ShitpostTag, User } from '@models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config.service';
import { SeedService } from './seed.service';

@Module({})
export class SeedModule {
  public static register(): DynamicModule {
    return {
      module: SeedModule,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Shitpost, ShitpostTag, Name]),
      ],
      providers: [Logger, SeedService],
      exports: [SeedService],
    };
  }
}
