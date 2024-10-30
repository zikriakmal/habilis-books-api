import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    publishedDate: string;

    @IsNotEmpty()
    author: string;
}
