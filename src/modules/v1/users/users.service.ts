import { Injectable } from '@nestjs/common';
import { Role, User } from './domain/user';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(private configService: ConfigService) { }
    private users: Array<User> = [];
    async onModuleInit() {
        const hashedPasswordAdmin = await bcrypt.hash( this.configService.get<string>('ADMIN_PASSWORD'), 10);
        const hashedPasswordUser = await bcrypt.hash(this.configService.get<string>('USER_PASSWORD'), 10);
        this.users.push({ id: 1, username: this.configService.get<string>('ADMIN_USERNAME'), password: hashedPasswordAdmin, role: Role.Admin });
        this.users.push({ id: 2, username: this.configService.get<string>('USER_USERNAME'), password: hashedPasswordUser, role: Role.User });
    }

    async findOne({ username }: { username: string }) {
        return this.users.find(user => user.username === username)
    }
}
