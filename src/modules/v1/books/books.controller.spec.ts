import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksModule } from './books.module';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[BooksModule],
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            getAll: jest.fn().mockResolvedValue({
              id: 1,
              title: "test",
              author: "test author",
              publishedDate: "1992-01-02"
            })
          }
        }
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  it('should return book data from service', async () => {
    const result = await booksController.findAll();
    expect(result).toEqual({
      id: 1,
      title: "test",
      author: "test author",
      publishedDate: "1992-01-02"
    });
    expect(booksService.getAll).toHaveBeenCalled();
  });
});
