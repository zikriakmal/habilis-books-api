import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    private books: Array<Book> = [];
    private lastId = 0;

    async create({ bookData }: { bookData: CreateBookDto }): Promise<Book> {
        this.lastId += 1;
        const book = {
            id: this.lastId,
            title: bookData.title,
            author: bookData.author,
            publishedDate: bookData.publishedDate
        }

        this.books.push(book);
        return book;
    }

    async getAll(): Promise<Array<Book>> {
        return this.books;
    }

    async getById({ id }: { id: number }): Promise<Book> {
        const findBookIndex = this.findBookIndexById(id);
        return this.books[findBookIndex];
    }

    async update({ updateBook, id }: { updateBook: UpdateBookDto, id: number }): Promise<Book> {
        const findBookIndex = this.findBookIndexById(id);

        if (updateBook.title !== "" && updateBook.title !== undefined) {
            this.books[findBookIndex].title = updateBook.title;
        }
        if (updateBook.author !== "" && updateBook.author !== undefined) {
            this.books[findBookIndex].author = updateBook.author;
        }
        if (updateBook.publishedDate !== "" && updateBook.publishedDate !== undefined) {
            this.books[findBookIndex].publishedDate = updateBook.publishedDate;
        }

        return this.books[findBookIndex];
    }

    async deleteById({ id }: { id: number }): Promise<Book> {
        const findBookIndex = this.findBookIndexById(id);
        const deletedBook = this.books[findBookIndex];
        this.books.splice(findBookIndex, 1);
        return deletedBook;
    }

    private findBookIndexById(id: number) {
        const findBookIndex = this.books.findIndex((dt: Book) => dt.id === id);
        if (findBookIndex === -1) {
            throw new NotFoundException(`Book id not found`);
        }
        return findBookIndex;
    }
}
