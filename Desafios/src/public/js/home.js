const socket = io();


//Nos ponemos a escuchar el evt 'Products'
socket.on('Products', data=>{
    const productsBox = document.getElementById('productBox')
    productsBox.innerHTML = data;
})