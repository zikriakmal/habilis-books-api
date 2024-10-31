import { Module } from '@nestjs/common';
import { V1Module } from './modules/v1/v1.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration available globally
  }), V1Module],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }, AppService],
})
export class AppModule { }
