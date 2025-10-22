import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) { }
  async create(createUserDto: CreateUserDto) {
    const {username, email, password, age, img} = createUserDto
    return this.userModel.create({ username, email, password, age, img })
  }

  async findAll() {
    return this.userModel.findAll()
  }
  async findOne(id: number) {
    const user = await this.userModel.findByPk(+id)

    if (!user) throw new NotFoundException("User not found")
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(+id)
    if (!user) throw new NotFoundException("User not found")

    await this.userModel.update(updateUserDto, { where: { id: +id } })
    return { massage: "Update user" }
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(+id)
    if (!user) throw new NotFoundException("User not found")

    await this.userModel.destroy({ where: { id: +id } })
    return { massage: "Deleted user" }
  }
}
