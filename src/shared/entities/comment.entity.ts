import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Article } from "./article.entity"
import { Auth } from "./auth.entity";

export const ContentTypes = ["image", "code", "list", "paragraph", "heading"] as const
export type ContentType = typeof ContentTypes[number]

@Entity({ name: "comments" })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string

    @Column({ default: 0 })
    clapCount: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    // realations
    @ManyToOne(() => Article, (article) => article.comments, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    article: Article;

    @ManyToOne(() => Auth, (user) => user.comment, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    articles: Auth;

    @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    parent: Auth;

        @OneToMany(() => Comment, (comment) => comment.parent, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    replies: Comment[];

}