import express from 'express';
import ProductManager from '../ProductManager/productManager.js';

const productManager = new ProductManager();
const app = express();

app.get('/products',async (req,res)=>{

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

app.get('/products/:pid', async (req,res)=>{
    console.log(req.params)
    const idParam = req.params.pid;
    console.log(idParam)
    const product = await productManager.getProductById(parseInt(idParam))
    res.send(product);
})


app.listen(8081,()=>{console.log('ExpServer is listening in port 8081')})
