import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/utils/jwt.strategy';

@Module({ imports: [PassportModule, BooksModule, AuthModule, UsersModule], providers: [JwtStrategy] })
export class V1Module { }
