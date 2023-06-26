import BaseRouter from "./router.js";

export default class UserRouter extends BaseRouter{
    init(){ //Cuando te inicialices, hacelo con estas rutas
        this.get('/',(req,res)=>{
            res.sendSuccess("Nueva forma de response")
        })

        this.get('/aaa',(req,res)=>{
            res.sendSuccessWithPayload({name:"Elena", email:"correoelena@correo.com"})
        })

    }
}