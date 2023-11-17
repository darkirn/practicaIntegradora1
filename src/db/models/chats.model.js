import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    user:{
        type: String,
        required: true},
    message:{
        type: String,
        required: true},

});


export const chatsModel = model('messages', chatSchema)

