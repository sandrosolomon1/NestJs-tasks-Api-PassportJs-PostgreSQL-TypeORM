import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepo} from "./user.repo";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserDto} from "./user.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepo)
        private userrepo: UserRepo,

        private readonly Jwt: JwtService
    ) {
    }

    async signUp(user: UserDto): Promise<User> {
        return this.userrepo.SignUp(user)
    }

    async signIn(user: UserDto) {
        const username = await this.userrepo.Validateuser(user)

        if (username === null) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = { username }
        const Token = this.Jwt.sign(payload)

        return { Token }
    }

}
