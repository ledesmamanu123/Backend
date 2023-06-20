import { Router } from "express";
import userModel from "../../dao/mongo/models/user.js";
import { createHash, generateToken, validatePassword } from "../utils.js";
import passport from "passport";
import { authToken } from "../../middlewares/jwtAuth.js";

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

//2do, se activa la auth de github
router.get('/github', passport.authenticate('github'), (req,res)=>{})


//3ro, finalmente, dsp de loguearse con github, no llega la info al nuestro callback
router.get('/githubcallback',passport.authenticate('github'), (req, res)=>{
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
 

//LOGICA DE SESSION CON JWT
router.post('/jwtLogin',async (req,res)=>{
    const {email, password} = req.body;
    let accessToken;
    let user;
        //Login de admin
        if(email === 'admin@admin.com'&& password ==='123'){
            user = {
                name: 'Admin',
                email: '...',
                role:'admin' 
            }
            //NO MANDAMOS MÁS LOS DATOS PARA CREAR LA SESSION, AHORA CON JWT, CREAMOS UN TOKEN
            accessToken = generateToken(user);
            res.send({status:"Success", accessToken:accessToken})
        }

        //verifico el email
        user = await userModel.findOne({email});
        if(!user) return res.sendStatus(400);

        //verficio la pass
        const isValidPass = await validatePassword(password, user.password);
        if(!isValidPass) return res.sendStatus(400);
        user={
            id:user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role:user.role
        }
        accessToken = generateToken(user);
        res.send({status:"Success", accessToken:accessToken})
})

router.get('/jwtProfile', authToken,async(req,res)=>{
    console.log(req.user)
    res.send({status:"Success", payload:req.user})

})

export default router;