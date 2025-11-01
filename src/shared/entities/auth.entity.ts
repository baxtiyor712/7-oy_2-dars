import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/enums/role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Article } from "./article.entity";

@Entity({ name: "auth" })
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ default: "ali" })
    username: string

    @Column()
    @ApiProperty({ default: "ali@gmail.com" })
    email: string

    @Column()
    @ApiProperty({ default: "ali11" })
    password: string

    @Column({ default: Role.User })
    role: string

    @Column({ nullable: true, type: "text" })
    bio: string

    @Column({ nullable: true})
    image: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    
    // realations

    @OneToMany(() => Article, (article) =>  article.author)
    articles: Article[] 

    //  @OneToMany(() => Comment, (comment) =>  comment.author)
    comment: Comment[]
}