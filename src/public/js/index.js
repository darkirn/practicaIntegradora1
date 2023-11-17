const socketClient =  io();

socketClient.on('welcome', (message) => {
    alert(message)
});

const addForm = document.getElementById('addForm');
const title = document.getElementById('title');
const showList = document.getElementById('productList');
const deleteForm = document.getElementById('deleteForm');
const createProd = document.getElementById('create');
const updateProd = document.getElementById('update');


// add item
createProd.addEventListener('click', create);

function create (e) {
    e.preventDefault();
    const prod = {

        title : addForm.title.value,
        description : addForm.description.value,
        price : addForm.price.value,
        thumbnail : addForm.title.value + addForm.description.value,
        code : addForm.code.value,
        stock : addForm.stock.value,
        category : addForm.category.value,

    }
    socketClient.emit('newProduct', prod);
    
};

// update item
updateProd.addEventListener('click', update);

function update (e) {
    e.preventDefault();
    const uProd = {

        title : addForm.title.value,
        description : addForm.description.value,
        price : addForm.price.value,
        thumbnail : addForm.title.value + addForm.description.value,
        code : addForm.code.value,
        stock : addForm.stock.value,
        category : addForm.category.value,
        _id: addForm.id.value,

    }
    socketClient.emit('updateProd', uProd);
    

}

//show list
socketClient.on('addNew', (newProdList) =>{

    const products = newProdList.map((p) => {
            return `<h4>Nombre del Producto : ${p.title}</h4>
                    <h4>Detalle : ${p.description}</h4>
                    <h4>Precio : $ ${p.price}</h4>
                    <h4>Thumbnail : ${p.thumbnail}</h4>
                    <h4>Codigo : ${p.code}</h4>
                    <h4>Stock : ${p.stock}</h4>
                    <h4>Categoria : ${p.category}</h4>
                    <h4>Id : ${p._id}</h4>
                    <hr>`;
        }).join(" ");

    showList.innerHTML = products;
});



// delete item

deleteForm.onsubmit = (e) => {
    e.preventDefault();
    const dProd = idd.value
    socketClient.emit('deleteProd', dProd);
    
};


