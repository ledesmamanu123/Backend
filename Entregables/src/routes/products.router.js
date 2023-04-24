import { Router } from "express";
import ProductManager from '../../ProductManager/productManager.js';
const productManager = new ProductManager();

const router = Router();

//METODOS GET
router.get('/',async (req,res)=>{

    const query = Object.keys(req.query)[0];
    const products = await productManager.getProducts();

    if(query != 'limit'){

        res.send(products)
        console.log("Whitout limit")
    } else{

        const queryValue = Object.values(req.query)[0];
        const productsLimited = products.slice(0,queryValue)
        res.send(productsLimited)
    }
})

router.get('/:pid', async (req,res)=>{
    console.log(req.params)
    const idParam = req.params.pid;
    console.log(idParam)
    const product = await productManager.getProductById(parseInt(idParam))
    res.send(product);
})



//METODOS POST
router.post('/', async (req, res)=>{
    //Guardamos el producto que nos llega desde el body
    const product = req.body;
    console.log(product)

    //Acá preguntar por boolean
    if(!product.status){product.status = true;}
    
    //Mandamos nuestro nuevo producto
    await productManager.addProducts(product)
})


export default router