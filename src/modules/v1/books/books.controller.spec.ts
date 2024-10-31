import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockValue),
            getAll: jest.fn().mockResolvedValue([mockValue]),
            getById: jest.fn().mockResolvedValue(mockValue),
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
    expect(booksService.create).toHaveBeenCalledWith(createBook);
    expect(result).toEqual({ id: 1, ...createBook })
  })

  it('should return array of book object from the service when calling get all on controller', async () => {
    const result = await booksController.findAll();
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
    const meong = 2;
    const expectedResult: Book = {
      id: 1,
      title: "test",
      author: "test author",
      publishedDate: "1992-01-02",
    };

    const result = await booksController.findOne(id);
    expect(booksService.getById).toHaveBeenCalledWith({ id });
    expect(result).toEqual(expectedResult);
  })

});
