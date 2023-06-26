import BaseRouter from "./router.js";
import jwt from 'jsonwebtoken';

export default class SessionRouter extends BaseRouter{
    init(){
        //Desde acá ya me pide la politica
        this.post('/login',["PUBLIC"],(req,res)=>{
            //Simulamos que el usuario si se logueo bien
            const user = {
                email:"correoTati@correo.com",
                role:"user"
            }

            const token = jwt.sign(user,'tokenSecret');
            res.sendSuccessWithPayload({token})
        })
        this.get('/current',["ADMIN","USER"],(req,res)=>{
            //El req.user viene desde la policies
            res.sendSuccessWithPayload({user:req.user})
        })
    }
}