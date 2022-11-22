import { Schema,model } from "mongoose";

const userSchma = new Schema({
    email: {
        type: String,
        required: true,
        trim :true,
        unique : true,
        lowercase : true,
    },
    password: {
        type: String,
        required: true
    }
})

export const User = model('user', userSchma);