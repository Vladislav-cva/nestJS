import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class createUserDto {

    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    surname?: string;

    @IsNotEmpty()
    @IsEmail()    
    email?: string;

    @IsNotEmpty()
    @Length(4, 8)
    password: string;
}