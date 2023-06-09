import { Router } from "express";
import ProductManager from '../../Managers/ProductManager/productManager.js';
import { REQUEST_STATUS } from "../consts.js";
const productManager = new ProductManager();

const router = Router();

//METODOS GET
router.get('/',async (req,res)=>{

    const query = Object.keys(req.query)[0];
    const queryValue = Object.values(req.query)[0];
    const products = await productManager.getProducts();

    if(query != 'limit'){
        res.send({status:"Success", payload:products})
        req.io.emit('ProductsExisting', products)
    } else if(queryValue > 0){
        const productsLimited = products.slice(0,queryValue)
        res.send(productsLimited);
    } else{return res.status(400).send({status:"error", message:"Invalid limit"})}
})

router.get('/:pid', async (req,res)=>{
    console.log(req.params)
    const idParam = req.params.pid;

    const product = await productManager.getProductById(parseInt(idParam));
    if(product === REQUEST_STATUS.NOT_FOUND){return res.status(404).send({status:"error", message:"Product doesn't exist"})}
    res.send(product);
})



//METODOS POST
router.post('/', async (req, res)=>{
    //Guardamos el producto que nos llega desde el body
    const product = req.body;
    //Acá preguntar por boolean
    if(!product.status){product.status = true;}
    
    //Mandamos nuestro nuevo producto
    const status = await productManager.addProducts(product)

    if(status === REQUEST_STATUS.REJECT){return res.status(404).send({status:"error", message:"Invalid code is already used"})}
    if(status === REQUEST_STATUS.INCOMPLETE){return res.status(404).send({status:"error", message:"Fields incompleted"})}
    res.send({status:"Success", message:"Product was created successfuly"})
    const products = await productManager.getProducts()
    req.io.emit('ProductChange', products)
})

//METODOS PUT
router.put('/:pid', async (req,res)=>{
    const idParam = req.params.pid;
    const updatedFields = req.body;
    const status = await productManager.updateProduct(parseInt(idParam), updatedFields);

    if(status === REQUEST_STATUS.NOT_FOUND){return res.status(404).send({status:"error", message:"Product doesn't exist"})}

    res.send({status:"Success Updated"})
})

//METODO DELETE
router.delete('/:pid', async (req,res)=>{
    const idParam = req.params.pid;
    const status = await productManager.deleteProduct(parseInt(idParam))
    if(status === REQUEST_STATUS.NOT_FOUND){return res.status(404).send({status:"error", message:"Product doesn't exist"})}
    res.send({status:"Product was deleted successfuly"})

    const products = await productManager.getProducts();
    req.io.emit('ProductChange', products)

})

export default router