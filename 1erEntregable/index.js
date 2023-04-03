class ProductManager {
    constructor(){
        this.products = [];
    }
    //Metodo para agregar productos
    addProducts = ({title, description, price, thumbnail, code, stock})=>{ //Desestructuramos el objeto que nos llega con {}.

        if (!title||!description||!price||!thumbnail||!code||!stock){
            console.log("Complete todos los campos")
            return null;
        }
        const product = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }
        if (this.products.length===0){//No hay productos
            product.id = 1;
        }else{//Ya hay productos
            const lastProduct = this.products[this.products.length-1]; //Accedo al último lugar del array.
            product.id = lastProduct.id + 1;
        }
        this.products.push(product)
    }
    //Método para devolver los productos
    getProducts = () => {
        return this.products;
    }
    //Método que me traiga un producto en especifico por el ID
    getProductById = (newId) =>{
        const productIndex = this.products.findIndex(product => product.id === newId) //Corroboramos que el producto exista en nuestro array mediante una condicion (en este caso, si el id del objeto del array que estamos iterando, es igual al id que nos mandan).
        if(productIndex === -1){ //Si la condicion no se cumple, hacer lo siguiente
            console.log("Not Found");
            return null;
        }
        //Si llega acá, entonces el producto existe, entonces, devolver el producto
        return this.products[productIndex];

    }
}

//Creamos una instancia donde vamos a mandarle los datos
const productManager = new ProductManager();

//Creamos un nuevo producto
const product1 = {
    title: "Motorola G60s", 
    description: "Celular gama-media", 
    price: 70000, 
    thumbnail :"#", 
    code: 001, 
    stock:3
}
const product2 = {
    title: "Motorola G7", 
    description: "Celular gama-media baja", 
    price: 20000, 
    thumbnail :"#", 
    code: 002, 
    stock:1
}

productManager.addProducts(product1);
productManager.addProducts(product2);

console.log(productManager.getProductById(3))
