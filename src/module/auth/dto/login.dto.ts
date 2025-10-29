import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";



export class LoginDto {

      @IsEmail()
       @Length(3, 100)
       @IsNotEmpty()
       @ApiProperty({ description: "email for register", example: "ali@gmail.com" })
       email: string;
   
       @IsString()
       @Length(3, 300)
       @IsNotEmpty()
       @ApiProperty({ description: "password for register", example: "ali11" })
       password: string;
}