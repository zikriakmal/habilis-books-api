import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Module({ imports: [BooksModule, AuthModule, UsersModule] })
export class V1Module { }
