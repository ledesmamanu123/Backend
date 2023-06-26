import { Router } from "express";


const router = Router();

//La expresion regular ([a-zA-Z]+), significa que SOLO va a tomar
//numeros alfabeticos, pero no admite letras con tilde
router.get('/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA]+)', (req,res)=>{
    console.log(req.params.word)
    res.send({palabraABuscar:"papa", word:req.params.word})
})


export default router;