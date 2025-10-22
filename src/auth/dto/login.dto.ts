import { IsString, IsEmail } from "class-validator";


export class LOginDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}