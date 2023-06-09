import { Router } from "express";
import { privacy } from "../../middlewares/auth.js";

const router = Router();

router.get('/register',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('register')
})

router.get('/login',privacy('NO_AUTHENTICATED'),(req,res)=>{
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

router.get('/',(req,res)=>{
    res.render('jwtProfile')
})
export default router;