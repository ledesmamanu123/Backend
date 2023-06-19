import { Router } from "express";
import userModel from "../../dao/mongo/models/user.js";
import { createHash, validatePassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/register',passport.authenticate('register', {failureRedirect: 'api/sessions/registerFail', failureMessage:true}), async (req,res)=>{ //en passport.authenticate('nombre de la estrategia', {Si hay un error, failureRedirect nos redirije a donde le indiquemos})
    res.send({status:'Success', message:'Register completed'})
})

//Page para recibir el error
router.get('/registerFail', (req,res)=>{
    //Si hubo un error, lo mostramos asi
    console.log(req.session.messages)
    res.status(400).send({status:'error', error: req.session.messages})
})

router.post('/login',passport.authenticate('login', {failureRedirect:'/api/sessions/loginFail', failureMessage:true}), async (req,res)=>{
    console.log("User de login: "+JSON.stringify(req.user))
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        id: req.user.id,
        role: req.user.role

    }
    return res.status(200)
}) 

router.get('/loginFail', (req,res)=>{
    console.log("Erorres de sesion en login: "+req.session.messages)
    res.status(400).send({status:'error', error: req.session.messages})
})

router.post('/restoredPassword', async (req,res)=>{
    const {email, password} = req.body;
    console.log({email:email, pass:password})
    const user = await userModel.findOne({email})
    //El usuario existe?
    if (!user) return res.status(400).send({status:'error', error:"User doesn't exist"})
    //Es la misma contraseña?
    const isSamePassword = await validatePassword(password, user.password)
    if(isSamePassword) return res.status(400).send({status:"error", error:"Cannot replace password with current password"})

    //Todo bien, hasheamos la pass
    const newHashPass = await createHash(password)
    await userModel.updateOne({email}, {$set: {password:newHashPass}})
    res.status(200).send({status:"Success", message:"Password restored"})
})
export default router;