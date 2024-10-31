import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('v1/books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    async create(@Body() body: CreateBookDto): Promise<Book> {
        const result = this.booksService.create({ bookData: body })
        return result;
    }

    @Get()
    async getAll(): Promise<Array<Book>> {
        const result = this.booksService.getAll();
        return result;
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Book> {
        const result = this.booksService.getById({ id: id });
        return result;
    }

    @Put(':id')
    async update(@Body() updateBook: UpdateBookDto, @Param('id') id: number): Promise<Book> {
        const result = this.booksService.update({ updateBook: updateBook, id: id });
        return result;
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number): Promise<any> {
        const result = this.booksService.deleteById({ id: id });
        return result;
    }



}
