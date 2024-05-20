const socket = io();

const list = document.getElementById("list")
const addForm = document.getElementById('addProductForm');
const deleteForm = document.getElementById("deleteProductForm")

socket.on('products', (products)=>{
    const productsRender = products.map((product)=>{
        return `<strong>${product.title}</strong> - ${product.price}`
    }).join(' ')

    list.innerHTML = productsRender
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const thumbnail = [];
    const product = {title, category, description, price, code, stock, thumbnail};
    socket.emit('addProductSocket', product); //envio info a mi servidor
})

deleteForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const id = document.getElementById("id").value;
    socket.emit("deleteProductSocket", id)
})
