import fs from 'fs'

const path = 'carrito.json'

class CartManager {
    
    async getCart(){
        try {
            const cart = await fs.promises.readFile(path, 'utf-8');
            const cartReaded = JSON.parse(cart)
            return cartReaded
        } catch (err) {
            return err
        }

    }

    
    async createCart(newCart){
        try {
            const readCart = await this.getCart({});
            
            let id
            if (!readCart.length){
                id=1

            } else if (readCart.lenght > 0) {
                id=readCart[readCart.length-1].id+1

            }
            const create = {...newCart,id}
            console.log(create)
            if (create.id === 1) {
                    let readCart = []
                    readCart.push(create)
                    await fs.promises.writeFile(path, JSON.stringify(readCart))
                    
            } else {

                readCart.push(create)
                await fs.promises.writeFile(path, JSON.stringify(readCart))
            }
            
            console.log(readCart)
            
            return create

        } catch (err) {
            return err 
        }}


    async searchCart(id) {
        try {
            const readCart = await this.getCart({});
            const found = readCart.find((cart) => cart.id === id)
            if (found) {
                return found   
            } else {
            console.log('Carrito no encontrado')
            }            

        } catch (error) {
            
    }}


    async updateCart (prod) {
        try {
            const readCart = await this.getCart({})
            const updated = readCart.findIndex((cart) => cart.id === prod.id)
            console.log(updated)
            if ( updated >= 0 ) {
                readCart[updated] = prod;
                await fs.promises.writeFile(path ,JSON.stringify(readCart))
                console.log(prod)
            } 
                else{
                console.log('no se encuentra el carrito')
            }
        } catch (err) {
            return err
        }
    }


}




export const carrito = new CartManager();