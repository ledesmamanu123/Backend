import { Router } from "express";
import userModel from "../../dao/mongo/models/user.js";
import { createHash, validatePassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/register',passport.authenticate('register', {failureRedirect: 'api/session/registerFail'}), async (req,res)=>{ //en passport.authenticate('nombre de la estrategia', {Si hay un error, failureRedirect nos redirije a donde le indiquemos})
    res.send({status:'Success', message:'Register completed'})
})

//Page para recibir el error
router.get('/registerFail', (req,res)=>{
    //Si hubo un error, lo mostramos asi
    console.log(req.session.messages)
    res.status(400).send({status:'error', error: req.session.messages})
})

router.post('/login',passport.authenticate('login', {failureRedirect:'/api/session/loginFail'}), async (req,res)=>{
    console.log(req.user)
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        id: req.user.id,
        role: req.user.role

    }
    res.sendStatus(200)
}) 

router.get('loginFail', (req,res)=>{
    console.log(req.session.messages)
    res.status(400).send({status:'error', error: req.session.messages})
})
export default router;