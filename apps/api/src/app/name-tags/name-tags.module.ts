import { NameTag } from '@models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameTagsController } from './name-tags.controller';
import { NameTagsService } from './name-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([NameTag])],
  controllers: [NameTagsController],
  providers: [NameTagsService],
  exports: [NameTagsService],
})
export class NameTagsModule {}
