import { Router } from "express";
import userModel from "../../dao/mongo/models/user.js";
import { createHash, validatePassword } from "../utils.js";

const router = Router();

router.post('/register', async (req,res)=>{
    const {email, first_name, last_name, password} = req.body;

    const exists = await userModel.findOne({email});
    if(exists) return res.status(404).send({status:'error', error: 'User already exists'});
    //Si el user no existe, encriptamos su pass
    const hashPass = await createHash(password);
    const user = {
        first_name,
        last_name,
        email,
        password:hashPass
    }
    const result = await userModel.create(user);
    res.send({status:'Success', message:'Register completed'})
})
router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    //Login de admin
    if(email === 'admin@admin.com'&& password ==='123'){
        req.session.user = {
            name: `${user.first_name}`,
            email: '...',
            role:'admin' 
        }
        res.sendStatus(200)
    }

    const user = await userModel.findOne({email}); //Verificamos si el email existe
    if(!user) return res.status(404).send({status:'error', message:'User or Pass incorrect'})

    const isValidPass = await validatePassword(password, user.password); //Verificamos la password
    if(!isValidPass) return res.status(400).send({status:'error', message:'Invalid password'})

    //Todo correcto, creamos el user
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`, //Con el usuario que encontraste en la bd, concatena el primer nombre con el apellido
        email: user.email 
    }
    res.sendStatus(200)
}) 

export default router;