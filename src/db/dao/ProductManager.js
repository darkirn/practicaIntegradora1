import fs from 'fs'

const path = 'productos.json'

class ProductManager {

    async getProducts(queryObj){
        const {limit} = queryObj;

        try {
            if (fs.existsSync(path)) {
                const productFile = await fs.promises.readFile(path, 'utf-8')
                const productData = JSON.parse(productFile)
                return limit ? productData.slice(0, +limit) : productData
                
            } else {
                return []
            }
        } catch (err) {
            return err
        }    
    }
        
    async addNew(product){
        try {
            const productsFile = await fs.promises.readFile(path, 'utf-8')
            const products = JSON.parse(productsFile)

            let id
            if (!products.length){
                id=1
            } else {
                id=products[products.length-1].id+1
            }
            if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category){
                console.log('Falta un dato');
                return products
            } else {
            const addProduct = {...product,status:true,id}
            const found = products.find((item) => 
                 item.code === product.code) 
                if (!found) {
                    products.push(addProduct)
                    await fs.promises.writeFile(path, JSON.stringify(products))
                    return products
                } else {
                    
                    console.log('producto ya ingresado')
                    return products
                }}
        } catch (err) {
            return err 
        }}

    async getProductById(id){
        try {
            const products = await this.getProducts({})
            const found = products.find((product) => product.id === id)
            if (found) {
                return found   
            } else {
            console.log('Producto no encontrado')
            }

        } catch (err){
            return err
        }}

    async deleteProduct(idd){
        try{
            //console.log(idd)
            const products = await this.getProducts({})
            const findId = products.filter((prod) => prod.id === idd)
            //console.log(findId)
            if (findId) {
                const neWProdArr = products.filter((prod) => prod.id !== idd)
                await fs.promises.writeFile(path,JSON.stringify(neWProdArr))
            } else {
                console.log('no se encuentra el producto')
            }

        } catch(err) {
            return err
        }
    }

    async updateProduct (prod) {
        try {
            const products = await this.getProducts({})
            const updated = products.findIndex((product) => product.id === prod.id)
            console.log(updated)
            if ( updated >= 0 ) {
                products[updated] = prod;
                await fs.promises.writeFile(path ,JSON.stringify(products))
                console.log(prod)
            } 
                else{
                console.log('no se encuentra el producto')
            }
        } catch (err) {
            return err
        }
    }
}





export const products = new ProductManager();