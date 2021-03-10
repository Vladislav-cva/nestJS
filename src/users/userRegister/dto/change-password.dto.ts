import { IsNotEmpty } from "class-validator";


export class ChangePassword {
    token: string;

    @IsNotEmpty()
    password: string;
}