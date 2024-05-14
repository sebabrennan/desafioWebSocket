const socket = io();

const list = document.getElementById("list")

socket.on('products', (products)=>{
    const productsRender = products.map((product)=>{
        return `<strong>${product.title}</strong> - ${product.price}`
    }).join(' ')

    list.innerHTML = productsRender
})