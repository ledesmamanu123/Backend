import { Router } from "express";
import userModel from "../../dao/mongo/models/user.js";

const router = Router();

router.post('/register', async (req,res)=>{
    console.log(req.body)
    const result = await userModel.create(req.body) //Suponiendo que llego todo bien
    res.send({status:'Success', message:'Register completed'})
})
router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    console.log(email)
    const user = await userModel.findOne({email, password});
    if(!user) return res.status(404).send({status:'error', message:'User or Pass incorrect'})
    console.log('Aca estoy')
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`, //Con el usuario que encontraste en la bd, concatena el primer nombre con el apellido
        email: user.email 
    }
    res.sendStatus(200)
}) 

export default router;