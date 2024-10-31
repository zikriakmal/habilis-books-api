import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(readonly usersService: UsersService, readonly jwtService: JwtService) { }

    async login({ loginData }: { loginData: LoginDto }): Promise<string> {

        const user = await this.usersService.findOne({ username: loginData.username });
        if (!user) throw new UnauthorizedException("Username not found");

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Incorrect password");

        const payload = { id: user.id, username: user.username, role: user.role };
        const jwt = this.jwtService.signAsync(payload);

        return jwt;
    }

}
