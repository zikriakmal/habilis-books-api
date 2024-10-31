// src/auth.middleware.ts
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';



@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(readonly jwtService: JwtService) { }
    use(req: any, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new HttpException('Authorization token not found', HttpStatus.UNAUTHORIZED);
        }
        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded;
            next();
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}
