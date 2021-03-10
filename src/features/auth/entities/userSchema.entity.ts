//Vendors
import { Document, model, Schema } from "mongoose";

export interface UserInterface extends Document{
    name: string;
    surname: string;
    email: string;
    password: string;
}



export interface UserJwt extends UserInterface {
    token : string
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

// interface UserSchemaEntityModel extends UserInterface, Document { };
export default model<UserInterface>("User", userSchema);