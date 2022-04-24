import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShitpostTag } from '../models/shitpost-tag.entity';
import { ShitpostTagsController } from './shitposts-tags.controller';
import { ShitpostTagsService } from './shitposts-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShitpostTag])],
  controllers: [ShitpostTagsController],
  providers: [ShitpostTagsService],
  exports: [ShitpostTagsService],
})
export class ShitpostTagsModule {}
