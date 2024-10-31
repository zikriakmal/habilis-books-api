import { IsDate, IsDateString, IsNotEmpty, IsString, isString } from "class-validator";

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsDateString()
    publishedDate: string;

    @IsString()
    @IsNotEmpty()
    author: string;
}
