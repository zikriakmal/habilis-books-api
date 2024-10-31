import { IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    @IsDateString()
    publishedDate?: string;

    @IsOptional()
    @IsString()
    author?: string;
}
