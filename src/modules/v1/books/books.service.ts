import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BooksService {
    private books = [];
    private lastId = 0;

    async create({ title, author, publishedDate }: { title: string, author: string, publishedDate: string }) {
        this.lastId += 1;
        const book = {
            id: this.lastId,
            title: title,
            author: author,
            publishedDate: publishedDate
        }

        this.books.push(book);
        return book;
    }

    async getAll() {
        return this.books;
    }

    async getById({ id }: { id: number }) {
        const book = this.books.find((dt) => dt.id === Number(id));
        if (!book) throw new NotFoundException(`Book id ${20} is not found`);
        return book;
    }

}
