import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/utils/roles.decorator';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { RolesGuard } from 'src/utils/roles.guard';
import { Role } from '../users/domain/user';

@Controller('v1/books')
@UseGuards(RolesGuard)
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    @Roles([Role.Admin])
    async create(@Body() body: CreateBookDto): Promise<Book> {
        const result = this.booksService.create({ bookData: body })
        return result;
    }

    @Get()
    @Roles([Role.Admin, Role.User])
    async getAll(): Promise<Array<Book>> {
        const result = this.booksService.getAll();
        return result;
    }

    @Get(':id')
    @Roles([Role.Admin, Role.User])
    async getById(@Param('id') id: number): Promise<Book> {
        const result = this.booksService.getById({ id: id });
        return result;
    }

    @Put(':id')
    @Roles([Role.Admin])
    async update(@Body() updateBook: UpdateBookDto, @Param('id') id: number): Promise<Book> {
        const result = this.booksService.update({ updateBook: updateBook, id: id });
        return result;
    }

    @Delete(':id')
    @Roles([Role.Admin])
    async deleteById(@Param('id') id: number): Promise<any> {
        const result = this.booksService.deleteById({ id: id });
        return result;
    }



}
