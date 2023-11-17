import { Router } from "express"
import { carrito } from "../db/dao/CartManagerDB.js";


const router = Router()

router.post('/:cid/products/:idProduct', async(req,res)=> {
    const { cid, idProduct } = req.params;

    const cart = await carrito.updateCart(cid, idProduct)
    res.json({ cart })
    
});

router.post('/', async (req,res)=> {

        const newCart = await carrito.createCart();
        res.json({ newCart });
 
});


router.get('/:cid', async(req,res)=>{
    const { cid } = req.params;
    try {
        const cart = await carrito.searchCart(cid);
        res.status(200).json({message:'Carrito', cart});
    } catch (err) {
        res.status(500).json({message:err.message});
    }

})



export default router;