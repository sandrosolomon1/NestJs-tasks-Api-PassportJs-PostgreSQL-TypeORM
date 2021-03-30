import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    username: string

    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: 'match the password betch'
    // })
    @IsNotEmpty()
    @MinLength(6)
    password: string
}