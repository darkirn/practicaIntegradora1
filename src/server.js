import express from 'express'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { products } from './db/dao/ProductManagerDB.js';
import './db/configDB.js'
import { Server } from 'socket.io';
import { chatsManager } from './db/dao/ChatsManagerDB.js';


// config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/views', viewsRouter);


const httpServer = app.listen(8080,()=>{
    console.log('listen!');
});


const socketServer = new Server(httpServer);

socketServer.on('connection', socket=> {
    console.log(`cliente conectado: ${socket.id}`);
    
    //add product
    socket.on('newProduct', async (prod) => {
        const newProdList = await products.addNew(prod);
        const actu = await products.getProducts();
        socketServer.emit('addNew', actu);
    });
    //delete product
    socket.on('deleteProd', async (dProd)  => {
        console.log(dProd)
        const newProdList = await products.deleteProduct(dProd);
        const actu = await products.getProducts();
        socketServer.emit('addNew', actu);
    });
    //update product
    socket.on('updateProd', async (uProd) => {
        //console.log(uProd)
        const update = await products.updateProduct(uProd)
        const actu = await products.getProducts();
        socketServer.emit('addNew', actu);
    });

    //receive chat user
    socket.on('newUser', (user) => {
        socket.broadcast.emit('nuevoUsuario', user);
    });
    //update chat
    socket.on('message', async (infoMessage) => {
        const addMessage = await chatsManager.updateList(infoMessage);
        const actu = await chatsManager.getChat();
        socketServer.emit('getChat', actu);

    });

});