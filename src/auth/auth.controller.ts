import {Body, Controller, Get, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from "./user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {
    }

    @Post('signup')
    signup(
        @Body(ValidationPipe) user: UserDto
    ) {
        return this.auth.signUp(user)
    }

    @Post('signin')
    signin(
        @Body() user: UserDto
    ) {
        return this.auth.signIn(user)
    }

    @Post('test')
    @UseGuards(AuthGuard())
    test(
        @Req() req
    ) {
        return req.user
    }
}
