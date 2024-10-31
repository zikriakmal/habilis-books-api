import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book and return it', async () => {
      const createBook: CreateBookDto = {
        title: "test",
        author: "test author",
        publishedDate: "1992-01-02",
      };

      const result = await booksService.create(createBook);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(createBook.title);
      expect(result.author).toBe(createBook.author);
      expect(result.publishedDate).toBe(createBook.publishedDate);
    });
  });

  describe('getAll', () => {
    it('should return an array of all books', async () => {
      const createBook: CreateBookDto = {
        title: "test",
        author: "test author",
        publishedDate: "1992-01-02",
      };
      await booksService.create(createBook);
      const result = await booksService.getAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0]).toHaveProperty('title', createBook.title);
    });
  });

  describe('getById', () => {
    it('should return a book if found by ID', async () => {
      const createBook: CreateBookDto = {
        title: "test",
        author: "test author",
        publishedDate: "1992-01-02",
      };
      const createdBook = await booksService.create(createBook);
      const result = await booksService.getById({ id: createdBook.id });
      expect(result).toEqual(createdBook);
    });

    it('should throw NotFoundException if book is not found', async () => {
      await expect(booksService.getById({ id: 999 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
