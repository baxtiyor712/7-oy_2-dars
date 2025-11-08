import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/shared/entities/article.entity';
import { ArticleContent } from 'src/shared/entities/article.content';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleContent])
],

  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService]
})
export class ArticlesModule {}
