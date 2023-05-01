import { Router } from "express";
const router = Router();

router.get('/',(req,res)=>{
    res.render('home')

})

router.get('/form',(req,res)=>{
    res.render('form')
})

router.get('/realtimeproducts',(req,res)=>{
    res.render('realTimeProducts')
})

export default router;