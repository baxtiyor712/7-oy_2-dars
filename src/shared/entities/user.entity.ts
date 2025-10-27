import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "user" })
export class User {

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

    @Column()
      @ApiProperty({default: 12})
    age: number

    @Column()
      @ApiProperty({default: "https://kun.uz/200/200"})
    img: string

}