import fs from 'fs';

export default class CartManager {
    constructor() {
        this.path = './Entregables/files/Carts.json';
    }

    getCarts = async () =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data);
            return carts;
        }else return [];
    }

    newCart = async (products) =>{
        const carts = await this.getCarts(); //CARTS = [products:["":""], id:1]
        if (carts.find(cart => cart.products[0] === id)){ //Validamos que el carrito no exista
            return console.log("El carrito ya existe");
        }
        const cart = {
            products
        }

        //Agregamos un ID al carrito
        if (carts.length===0){ //No hay carritos
            cart.id = 1;
        }else{ //Ya hay carritos
            const lastCart = carts[carts.length-1]; //Accedo al último lugar del array.
            cart.id = lastCart.id + 1;
        }
        carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        console.log(`Cart was created successful`);
    }

}
