import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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

      const result = await booksService.create({ bookData: createBook });

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
      await booksService.create({ bookData: createBook });
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
      const createdBook = await booksService.create({ bookData: createBook });
      const result = await booksService.getById({ id: createdBook.id });
      expect(result).toEqual(createdBook);
    });

    it('should throw NotFoundException if book is not found', async () => {
      await expect(booksService.getById({ id: 999 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      const createBook: CreateBookDto = {
        title: "test",
        author: "test author",
        publishedDate: "1992-01-02",
      };
      await booksService.create({ bookData: createBook });
    })

    test('should update the book title', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Title', publishedDate: '', author: '' };
      const updatedBook = await booksService.update({ updateBook: updateBookDto, id: 1 });

      expect(updatedBook.title).toBe('Updated Title');
      expect(updatedBook.author).toBe('test author');
      expect(updatedBook.publishedDate).toBe('1992-01-02');
    });

    test('should update the book author', async () => {
      const updateBookDto: UpdateBookDto = { title: '', publishedDate: '', author: 'Updated Author' };
      const updatedBook = await booksService.update({ updateBook: updateBookDto, id: 1 });

      expect(updatedBook.author).toBe('Updated Author');
      expect(updatedBook.title).toBe('test');
      expect(updatedBook.publishedDate).toBe('1992-01-02');
    });

    test('should update the book published date', async () => {
      const updateBookDto: UpdateBookDto = { title: '', publishedDate: '2024-03-01', author: '' };
      const updatedBook = await booksService.update({ updateBook: updateBookDto, id: 1 });

      expect(updatedBook.publishedDate).toBe('2024-03-01');
      expect(updatedBook.title).toBe('test');
      expect(updatedBook.author).toBe('test author');
    });

    test('should not change book properties if no updates provided', async () => {
      const updateBookDto: UpdateBookDto = { title: '', publishedDate: '', author: '' };
      const updatedBook = await booksService.update({ updateBook: updateBookDto, id: 1 });

      expect(updatedBook.publishedDate).toBe('1992-01-02');
      expect(updatedBook.title).toBe('test');
      expect(updatedBook.author).toBe('test author');
    });

    test('should throw an error if the book is not found', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Some Title', publishedDate: '', author: '' };

      await expect(booksService.update({ updateBook: updateBookDto, id: 999 }))
        .rejects
        .toThrow('Book id not found');
    });
  })

  describe('delete', () => {
    beforeEach(async () => {
      const createBook: CreateBookDto = {
        title: "test",
        author: "test author",
        publishedDate: "1992-01-02",
      };
      await booksService.create({ bookData: createBook });
      await booksService.create({ bookData: createBook });
    })

    test('should delete the book by ID and return the deleted book', async () => {
      const id = 1;
      const deletedBook = await booksService.deleteById({ id: id });

      expect(deletedBook).toEqual({
        id: id,
        title: "test",
        author: "test author",
        publishedDate: "1992-01-02",
      });
      expect(booksService['books']).toHaveLength(1);
      expect(booksService['books']).not.toContainEqual(deletedBook);
    });

    test('should throw an error if the book is not found', async () => {
      await expect(booksService.deleteById({ id: 999 }))
        .rejects
        .toThrow('Book id not found');
    });
  })
});
