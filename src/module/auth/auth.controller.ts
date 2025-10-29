import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(201)
  @ApiOperation({ description: "API for register" })
  @ApiResponse({ status: 401, description: "User already exist" })
  @ApiResponse({ status: 201, description: "Registered" })
  @ApiBody({
    type: RegisterDto,
  })


  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @HttpCode(200)
  @ApiOperation({ description: "API for login" })
  @ApiUnauthorizedResponse({ description: "User not found" })
  @ApiResponse({ status: 200, description: "Success" })
  @ApiBody({
    type: LoginDto,
  })

  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

}
