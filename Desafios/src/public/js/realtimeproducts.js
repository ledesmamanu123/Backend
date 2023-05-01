const socket = io();

socket.on('newProductAdd', data=>{
    const productBox = document.getElementById('ProductsBox')
    productBox.innerHTML = data;
})