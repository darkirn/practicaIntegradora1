import { cartsModel } from '../models/carts.model.js';

class CartManager {
    
    async createCart(){
        
        const newCart = { products: []} ;
        const addCartDB = await cartsModel.create(newCart);
        return addCartDB;
    }; 


    async searchCart(id) {
        
        try {
            const readCart = await cartsModel.findById(id).populate('products.product');
            if (readCart) {
                return readCart   
            } else {
            console.log('Carrito no encontrado')
            }            

        } catch (error) {
            
    }};


    async updateCart (idCart, idProduct) {
               
        const readCart = await cartsModel.findById(idCart);

        const ifInCart = readCart.products.findIndex((p) => p.product.equals (idProduct));
        
        if ( ifInCart === -1 ) {
            readCart.products.push({product: idProduct, quantity: 1});
            
        }   else{
            readCart.products[ifInCart].quantity++;
        }

        return readCart.save();
   
    }


}




export const carrito = new CartManager();