
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNumber, Length, IsNotEmpty } from "class-validator";


export class CreateUserDto {
    @IsString()
    @Length(3, 100)
    @IsNotEmpty()
    @ApiProperty({ description: "username for register", example: "ali" })
    username: string;

    @IsEmail()
    @Length(3, 100)
    @IsNotEmpty()
    @ApiProperty({ description: "email for user", example: "ali@gmail.com" })
    email: string;

    @IsString()
    @Length(3, 300)
    @IsNotEmpty()
    @ApiProperty({ description: "password for user", example: "ali11" })
    password: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: "age for user", example: 12 })
    age: number;

    @IsString()
    @Length(3, 300)
    @IsNotEmpty()
    @ApiProperty({ description: "img for user", example: "https://localhost:4001/img.png" })
    img: string;
}