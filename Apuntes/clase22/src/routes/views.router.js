import { Router } from "express";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../utils.js";

const router = Router();

router.get('/register',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('register')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/profile',privacy('PRIVATE'),(req,res)=>{
    res.render('profile', {
        user: req.session.user
    })
})
router.get('/restoredPassword', privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('restoredPass')
})

router.get('/',passportCall('jwt', {redirect:'/login'}),(req,res)=>{
    console.log(req.user)
    res.render('jwtProfile', {user: req.user})
})
export default router;