import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth) private authModel: typeof Auth) { }

    async register(registerDto: RegisterDto) {
        const { username, email, password } = registerDto

        const user = await this.authModel.findOne({ where: { email } })
        if (user) throw new UnauthorizedException("User already exist")

        await this.authModel.create({ username, email, password })
        return { mssage: "Registred" }
    }

}
