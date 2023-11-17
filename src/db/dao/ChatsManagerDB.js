import { chatsModel } from "../models/chats.model.js";

class ChatManager {

    async getChat(){

        try {
            const findChat = await chatsModel.find()
            
            return findChat
            
        } catch (err) {
            return err
        }
    };

    async updateList(chat) {
        try {
            const createOne = await chatsModel.create(chat)
            return createOne
        } catch (err) {
            return err 
        }

    }

}

export const chatsManager = new ChatManager();