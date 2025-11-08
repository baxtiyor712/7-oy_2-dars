import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/shared/entities/article.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ArticleContent } from 'src/shared/entities/article.content';
import { Auth } from 'src/shared/entities/auth.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRapository: Repository<Article>,
    @InjectRepository(ArticleContent) private articleContentRapository: Repository<ArticleContent>,
  ) { }

async create(createArticleDto: CreateArticleDto, author: Auth) {
  const { content, tags, title, description, body, imgUrl, IsMemberOnly } = createArticleDto;

  const contentEntities = content.map(data =>
    this.articleContentRapository.create(data as unknown as DeepPartial<ArticleContent>)
  );

  const article = this.articleRapository.create({
    author,
    tags, // endi bu string[] bo‘lishi mumkin
    content: contentEntities,
    title,
    description,
    body,
    imgUrl,
    IsMemberOnly,
  });

  return await this.articleRapository.save(article);
}



  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
