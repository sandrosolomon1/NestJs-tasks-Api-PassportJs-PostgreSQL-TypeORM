import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepo} from "./user.repo";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import * as config from 'config';

@Module({
  controllers: [
      AuthController
  ],
  imports: [
    TypeOrmModule.forFeature([UserRepo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.get('jwt').secret,
      signOptions: {
        expiresIn: config.get('jwt').expiresIn
      }
    })
  ],
  exports: [
      TypeOrmModule,
      JwtModule,
      PassportModule
  ],
  providers: [
      AuthService,
      JwtStrategy
  ]
})
export class AuthModule {}
