import mongoose, { Schema, model } from "mongoose";

const cartsSchema = new Schema({
    products:[
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products'
            },
            quantity: {
                type: Number,
            },
            _id: false,

        },
    ],
});


export const cartsModel = model('Carts', cartsSchema)

