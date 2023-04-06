import ProductManager from "./ProductManager/productManager.js";

//Nueva instancia
const productManager = new ProductManager();
const context = async () =>{
    //Creamos un nuevo producto
    const product1 = {
        title: "Motorola G60s", 
        description: "Celular gama-media", 
        price: 70000, 
        thumbnail :"#", 
        code: '001', 
        stock:3
    }
    const product2 = {
        title: "Motorola G7", 
        description: "Celular gama-media baja", 
        price: 20000, 
        thumbnail :"#", 
        code: '002', 
        stock:1
    }

    const product3 = {
        title: "Motorola G8", 
        description: "Celular gama-media baja", 
        price: 21000, 
        thumbnail :"#", 
        code: '003', 
        stock:1
    }
    // await productManager.addProducts(product1);
    // await productManager.addProducts(product2);
    // await productManager.getProductById(4);
    //await productManager.updateProduct(1, 'price', 25000);
}

context();