import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('v1/books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    async create(@Body() body: CreateBookDto): Promise<Book> {
        const result = this.booksService.create({
            author: body.author,
            publishedDate: body.publishedDate,
            title: body.title
        })
        return result;
    }

    @Get()
    async findAll(): Promise<any> {
        const result = this.booksService.getAll();
        return result;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
        const result = this.booksService.getById({ id: id });
        return result;
    }

}
