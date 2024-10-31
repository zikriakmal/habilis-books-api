import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const mockValue = {
      id: 1,
      title: "test",
      author: "test author",
      publishedDate: "1992-01-02",
    }

    const mockUpdatedValue = {
      id: 1,
      title: "test title update",
      author: "test author update",
      publishedDate: "1992-01-04",
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockValue),
            getAll: jest.fn().mockResolvedValue([mockValue]),
            getById: jest.fn().mockResolvedValue(mockValue),
            update: jest.fn().mockResolvedValue(mockUpdatedValue),
            deleteById: jest.fn().mockResolvedValue(mockValue)
          },
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  it('should return book object from the service when calling create on controller', async () => {
    const createBook: CreateBookDto = {
      title: "test",
      author: "test author",
      publishedDate: "1992-01-02",
    }
    const result = await booksController.create(createBook)
    expect(booksService.create).toHaveBeenCalledWith({ bookData: createBook });
    expect(result).toEqual({ id: 1, ...createBook })
  })

  it('should return array of book object from the service when calling get all on controller', async () => {
    const result = await booksController.getAll();
    expect(result).toEqual([
      {
        id: 1,
        title: "test",
        author: "test author",
        publishedDate: "1992-01-02",
      },
    ]);
    expect(booksService.getAll).toHaveBeenCalled();
  });

  it('should return book for param id when calling findOne', async () => {
    const id = 1;
    const expectedResult: Book = {
      id: id,
      title: "test",
      author: "test author",
      publishedDate: "1992-01-02",
    };

    const result = await booksController.getById(id);
    expect(booksService.getById).toHaveBeenCalledWith({ id });
    expect(result).toEqual(expectedResult);
  })

  it('should return book for param id, and updateBook when calling update', async () => {
    const id = 1;
    const updateBookData: UpdateBookDto = {
      title: "test title update",
      author: "test author update",
      publishedDate: "1992-01-04",
    }

    const expectedResult: Book = {
      id: id,
      title: "test title update",
      author: "test author update",
      publishedDate: "1992-01-04",
    };

    const result = await booksController.update(updateBookData, id);
    expect(booksService.update).toHaveBeenCalledWith({ updateBook: updateBookData, id });
    expect(result).toEqual(expectedResult);
  });

  it('should return book for param id when calling deleteById', async () => {
    const id = 1;
    const expectedResult: Book = {
      id: id,
      title: "test",
      author: "test author",
      publishedDate: "1992-01-02",
    };

    const result = await booksController.deleteById(id);
    expect(booksService.deleteById).toHaveBeenCalledWith({ id });
    expect(result).toEqual(expectedResult);
  });

});
