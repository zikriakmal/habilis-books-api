import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    private books: Array<Book> = [];
    private lastId = 0;

    async create({ title, author, publishedDate }: CreateBookDto): Promise<Book> {
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
        if (!book) throw new NotFoundException(`Book id not found`);
        return book;
    }

}
