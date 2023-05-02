const socket = io();
const productBox = document.getElementById('ProductsBox')
socket.on('ProductsExisting',data=>{
    let message = "";
    data.forEach(product =>{
        console.log(`Escuchando el evt Existing ${product}`)
        message+= `<li>${product.title} : ${product.price}</li>`
    })
    console.log("ahi llego rey")
    productBox.innerHTML = message;
})
socket.on('ProductChange',data=>{
    console.log(`Escuchando el evt Change`)
    let message = "";
    data.forEach(product =>{
        message+= `<li>${product.title} : ${product.price}</li>`
    })
    productBox.innerHTML = message;
})