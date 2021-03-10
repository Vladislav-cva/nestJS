import { object, string } from "yup";
import { UserInterface } from "../entities/userSchema.entity";


export const UserSchema = object<UserInterface>().shape(
    {
        name: string().required(),
        surname: string().required(),
        email: string().email().required(),
        password: string().required(),
    }
);

export const UserLoginRequestSchema = object().shape(
    {
        email: string().required(),
        password: string().required(),
    }
);