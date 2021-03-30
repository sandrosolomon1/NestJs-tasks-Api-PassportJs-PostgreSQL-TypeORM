import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepo} from "./user.repo";
import {UnauthorizedException} from "@nestjs/common";
import * as config from 'config';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepo)
        private userrepo: UserRepo
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt').secret
        });
    }

    async validate(payload): Promise<any> {
        const {username} = payload

        const _user = await this.userrepo.findOne({ username });

        if (!_user) {
            throw new UnauthorizedException();
        }

        return _user;
    }
}