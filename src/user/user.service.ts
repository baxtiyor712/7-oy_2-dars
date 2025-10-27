import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';




@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, age, img } = createUserDto
    const user = this.userRepo.create({ username, email, password, age, img })
    return this.userRepo.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({id: +id})
    if (!user) throw new NotFoundException("User not found")
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<{message: string}> {
    const user = await this.userRepo.findOneBy({id:+id})
    if (!user) throw new NotFoundException("User not found")

    await this.userRepo.update( id, updateUserDto)
    return { message: "Update user" }
  }

  async remove(id: number):Promise<{message: string}> {
    const user = await this.userRepo.findOneBy({id: +id})
    if (!user) throw new NotFoundException("User not found")

    await this.userRepo.remove(user)
    return { message: "Deleted user" }
  }
}
