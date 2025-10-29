import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as nodemailer from "nodemailer";
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/shared/entities/auth.entity';
import { Repository } from 'typeorm';

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
        @InjectRepository(Auth) private authRepo: Repository<Auth>,
        private jwtService: JwtService
    ) { }


    // register///
    async register(registerDto: RegisterDto): Promise<{ message: string }> {
        const { username, email, password } = registerDto

        const user = await this.authRepo.findOneBy({ email })
        if (user) throw new UnauthorizedException("User already exist")

        await this.transport.sendMail({
            from: "baxtiyorrajabboyev013@gmail.com",
            to: email,
            subject: "shunchaki",
            text: "salom hayr"
        })

        const hash = await bcrypt.hash(password, 10);

        const result = this.authRepo.create({ username, email, password: hash, role: "user" })
        await this.authRepo.save(result)
        return { message: "Registred" }
    }


    // login  ///
    async login(loginDto: LoginDto): Promise<{ message: string } | { message: string, token: string }> {
        const { email, password } = loginDto

        const user = await this.authRepo.findOneBy({ email })
        if (!user) throw new UnauthorizedException("User not found")


        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const payload = { sub: user.id, username: user.username, role: user.role };
            const token = await this.jwtService.signAsync(payload)
            return { message: "Success", token }
        } else {
            return { message: "wrong password" }
        }
    }

}
