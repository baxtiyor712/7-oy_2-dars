import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.contants';

@Module({
  imports: [
    SequelizeModule.forFeature([Auth]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
