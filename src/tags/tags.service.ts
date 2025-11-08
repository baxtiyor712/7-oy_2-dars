import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/shared/entities/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tags) private tagsRepository: Repository<Tags>) { }
  async create(createTagDto: CreateTagDto) {
    const { name, description } = createTagDto
    const tag = this.tagsRepository.create({ name, description })
    return this.tagsRepository.save(tag)
  }

  async findAll() {
    return this.tagsRepository.find()
  }

   async remove(id: number) {
    const tag = await this.tagsRepository.findOneBy({ id: +id })
    if (!tag) throw new NotFoundException("tag not found")

    await this.tagsRepository.remove(tag)
    return { message: "Deleted tag" }
  }
}
