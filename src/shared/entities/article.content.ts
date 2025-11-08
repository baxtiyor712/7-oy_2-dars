import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Article } from "./article.entity"

export const ContentTypes = ["image", "code", "list", "paragraph", "heading"] as const
export type ContentType = typeof ContentTypes[number]

@Entity({ name: "articlecntent" })
export class ArticleContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string


    @Column()
    order: string   

    @Column({ type: "enum", enum: ContentTypes, default: "paragraph" })
    contentType: ContentType

    @Column({ type: "enum", enum: ContentTypes, default: "paragraph"})
    metadata: {
     language?: string;
     caption?: string;
     listType?: "ordered" | "unordered";
     level?: number;
    }    

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Article, (article) => article.contents,{onDelete: "CASCADE", onUpdate: "CASCADE"})
    article: Article

}