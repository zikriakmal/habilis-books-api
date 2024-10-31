import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { V1Module } from './modules/v1/v1.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { BooksController } from './modules/v1/books/books.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration available globally
  }), V1Module],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }, AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(BooksController);
  }
}