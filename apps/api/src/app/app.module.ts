import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { NameTagsModule } from './name-tags/name-tags.module';
import { NamesModule } from './names/names.module';
import { ShitpostTagsModule } from './shitpost-tags/shitposts-tags.module';
import { ShitpostsModule } from './shitpost/shitposts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ShitpostsModule,
    ShitpostTagsModule,
    NamesModule,
    NameTagsModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
