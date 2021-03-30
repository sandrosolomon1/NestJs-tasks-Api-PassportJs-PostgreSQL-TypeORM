import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {UserDto} from "./user.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepo extends Repository<User> {
    async SignUp(user: UserDto): Promise<User> {
        const {username,password} = user

        const salt = bcrypt.genSaltSync()
        const newUser = new User()
        newUser.username = username
        newUser.password = await bcrypt.hash(password,salt)
        newUser.salt = salt

        try {
            return await newUser.save()
        } catch (e) {
            if(e.code === '23505') throw new ConflictException('Username exist betch')
            else {
                throw new InternalServerErrorException()
            }
        }
    }

    public async Validateuser(user: UserDto): Promise<string | null> {
        const User = await this.findOne({username: user.username})

        if(User && await User.ValidatePassword(user.password)) {
            return User.username
        } else {
            return null
        }
    }

}