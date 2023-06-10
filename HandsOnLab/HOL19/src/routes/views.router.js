import { Router } from "express";
import { privacy } from "../../middlewares/auth.js";

const router = Router();

router.get('/register',privacy('PRIVATE'),(req,res)=>{
    res.render('register')
})

router.get('/login',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('login')
})

router.get('/profile',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('profile', {
        user: req.session.user
    })
})
export default router;