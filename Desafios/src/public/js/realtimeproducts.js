const socket = io();
const productBox = document.getElementById('ProductsBox')
socket.on('ProductsExisting',data=>{
    data.forEach(product =>{
        let message = "";
        message+= `${product.title} : ${product.price} <br/>`
    productBox.innerHTML = message;
    })
})
socket.on('ProductChange',data=>{
    data.forEach(product =>{
        let message = "";
        message+= `${product.title} : ${product.price} <br/>`
    productBox.innerHTML = message;
    })
})