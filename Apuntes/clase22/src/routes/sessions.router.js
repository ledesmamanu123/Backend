import { Router } from "express";
import userModel from "../dao/mongo/models/user.js";
import { createHash, generateToken, passportCall, validatePassword } from "../utils.js";
import passport from "passport";
import { authToken } from "../middlewares/jwtAuth.js";

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

router.post('/login',passportCall('login'), async (req,res)=>{
    const user = {
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        role:req.user.role
    }
    const accessToken = generateToken(user);
    res.cookie('authToken',accessToken,{
        maxAge:1000*60*60*24,
        httpOnly:true //La cookie solo se podrá acceder mediante http
        //sameSite: "lax", "none", "strict"
    }).sendStatus(200)
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

//2do, se activa la auth de github
router.get('/github', passportCall('github'), (req,res)=>{})


//3ro, finalmente, dsp de loguearse con github, no llega la info al nuestro callback
router.get('/githubcallback',passportCall('github'), (req, res)=>{
    const user = req.user;
    //Creo la sesion
    req.session.user = {
        id: user.id,
        name:user.first_name,
        role:user.role,
        email:user.email
    }
    res.status(400).send({status:"Success", message:"Logueado pero con Github"})
})
 

router.get('/jwtProfile', authToken,async(req,res)=>{
    console.log(req.user)
    res.send({status:"Success", payload:req.user})

})

export default router;