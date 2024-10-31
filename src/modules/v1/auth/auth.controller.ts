import { Body, Controller, Get } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
    constructor(readonly authService: AuthService) { }

    @Get('login')
    async login(@Body() loginData: LoginDto): Promise<string> {
        const result = this.authService.login({ loginData: loginData });
        return result;
    }
}

