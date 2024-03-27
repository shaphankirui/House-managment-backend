import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('signup')
    signUp(@Body() dto:AuthDto) {
        console.log({
            dto 
        })
        return this.authService.signUp(dto);
    }
    @HttpCode(HttpStatus.OK)
    @Post('login') 
    signIn(@Body() dto:AuthDto) {
        console.log('Request payload:', dto);
        return this.authService.signin(dto);
    }
}
