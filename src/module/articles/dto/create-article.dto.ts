import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateArticleContentDto {
    @IsString()
    title: string;

    @IsNumber()
    order: number;

    @IsEnum(["image", "code", "list", "paragraph", "heading"])
    contentType: string;
}

export class CreateArticleDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    body: string;

    @IsString()
    imgUrl: string;

    @IsArray()
    @IsString()
    tags: string[];


    @IsOptional()
    @IsBoolean({each: true})
    IsMemberOnly?: boolean;


    @IsArray()
    @Type(() => CreateArticleContentDto)
    content: CreateArticleContentDto[];

}


