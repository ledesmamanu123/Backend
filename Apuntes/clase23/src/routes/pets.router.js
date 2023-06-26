import { Router } from "express";

const router = Router();


//Con un router.param podemos gestionar las expresiones regulares de nuestras variables via URL, es un middleware
router.param('pet', (req,res,next,pet)=>{
    //Así se manejan las expresiones regulares entre los /*/ donde * es la expresion q querramos validar
    const isValidParam = /^[A-Za-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]+$/.test(pet);
    console.log(isValidParam);
    if(!isValidParam) return res.status(404).send({status:"error", error:"Not Found"})
    req.pet = pet;
    next();
});

router.get('/:pet',(req,res)=>{
    res.send(req.pet)
})

router.put('/:pet',(req,res)=>{ //Ya no es necesario la expresion regular en el endpoint
    res.send(req.pet)
})

//El * se utiliza para redireccionar todo tipo de error q haya en los endpoints
router.get('*',(req,res)=>{
    res.send("Mascota no encontrada")
})

export default router;