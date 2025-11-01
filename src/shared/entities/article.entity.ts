import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Auth } from "./auth.entity";
import { Articlecontent } from "./article.content";
import { Comment } from "./comment.entity";


@Entity({ name: "article" })
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    title: string


    @Column({ type: "text" })
    body: string


    @Column()
    imgUrl: string


    @Column({ default: false })
    IsMemeberOnly: boolean

    @CreateDateColumn()
    updatedAt: Date


    // realations

    @ManyToOne(() => Auth, (user) => user.articles)
    author: Auth;

    @OneToMany(() => Comment, (comment) => comment.articles, { cascade: true })
    comments: Comment[];

    @OneToMany(() => Articlecontent, (comment) => comment.article, { cascade: true })
    comment: Articlecontent[];
    contents: any;


}