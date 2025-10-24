import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";



export class LoginDto {

    @IsEmail()
    @Length(3, 100)
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(3, 300)
    @IsNotEmpty()
    password: string;
}