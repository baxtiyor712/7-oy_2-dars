import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import * as nodemailer from "nodemailer";
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "baxtiyorrajabboyev013@gmail.com",
            pass: "v q s v t n m o t x z j u g z a"
        }
    })
    constructor(
        @InjectModel(Auth) private authModel: typeof Auth,
        private jwtService: JwtService

    ) { }


    // register///
    async register(registerDto: RegisterDto) {
        const { username, email, password } = registerDto

        const user = await this.authModel.findOne({ where: { email } })
        if (user) throw new UnauthorizedException("User already exist")

        await this.transport.sendMail({
            from: "baxtiyorrajabboyev013@gmail.com",
            to: email,
            subject: "shunchaki",
            text: "salom hayr"
        })

        const hash = await bcrypt.hash(password, 10);

        await this.authModel.create({ username, email, password: hash, role: "user" })
        return { mssage: "Registred" }
    }


    // login  ///
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto

        const user = await this.authModel.findOne({ where: { email } })
        if (!user) throw new UnauthorizedException("User not found")


        const isMatch = await bcrypt.compare(password, user.dataValues.password);

        if (isMatch) {
            const payload = { sub: user.dataValues.id, username: user.dataValues.username, role: user.dataValues.role };
            const token = await this.jwtService.signAsync(payload)
            return { mssage: "Success", token }
        } else {
            return { message: "wrong password" }
        }


    }

}
