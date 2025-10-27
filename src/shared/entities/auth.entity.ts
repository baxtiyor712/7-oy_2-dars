import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "auth" })
export class Auth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({default: "ali"})
    username: string

    @Column()
    @ApiProperty({default: "ali@gmail.com"})
    email: string

    @Column()
    @ApiProperty({default: "ali11"})
    password: string

    @Column({default: Role.User})
    role: string
}