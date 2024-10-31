import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { V1Module } from './modules/v1/v1.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration available globally
  }), V1Module],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }, AppService],
})
export class AppModule {
}