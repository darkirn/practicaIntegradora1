import { productsModel } from "../models/products.model.js";

class ProductManager {

    async getProducts(queryObj){
            //const {limit} = queryObj;
    
            try {
                const findProds = await productsModel.find()
                //console.log(findProds);
                return /*limit ? findProds.slice(0, +limit) :*/ findProds
                
            } catch (err) {
                return err
            }}
            
    async addNew(product){
        
        if (product.code > 0) {
            try {
                const createOne = await productsModel.create(product)
                return createOne
            } catch (err) {
                return err 
            }
        }   
    } 
        

    async getProductById(id){
        
        if (id !== '') {
            try {
                const findById = await productsModel.findById(id)
                return findById   
            } catch (err){
                return err
             } 
        }   else {
                console.log('Producto no encontrado')
        }
    }

    async deleteProduct(idd){
        try{
            const products = await productsModel.findByIdAndDelete(idd)
            if (products) {
                return products;
            } else {
                return products;

            }

        } catch(err) {
            return err
        }
    }

    async updateProduct (uProd) {
        const id = uProd._id

        try {
            const products = await productsModel.findByIdAndUpdate(id, uProd)
            return products
        } catch (err) {
            return err
        }
    }
}

export const products = new ProductManager();