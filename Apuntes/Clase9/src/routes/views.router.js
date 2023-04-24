import { Router } from "express";


const router = Router();

router.get('/',(req, res)=>{
    const user ={
        name:"Lucas",
        email:"agustin@correo.com"
    }
    res.render('home', { //render va a buscar el archivo a views
        name: user.name,
        css:"users"
    }) 
})

router.get('/food',(req,res)=>{
    const food = [
        {name:"Hamburguesa", price:120},
        {name:"Papa con queso", price:1200},
        {name:"Pancho", price:12}
    ]
    res.render('food',{
        food,
        css:"food"
    })
})

export default router;