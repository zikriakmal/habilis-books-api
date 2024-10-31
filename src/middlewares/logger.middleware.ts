import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, url } = req;
        const utcTimestamp = new Date();
        const timestamp = new Date(utcTimestamp.getTime() + 7 * 60 * 60 * 1000).toISOString();
        
        console.log(`[${timestamp}] ${method} ${url}`);
        next();
    }
}