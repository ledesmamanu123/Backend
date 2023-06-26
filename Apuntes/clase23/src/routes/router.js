import { Router } from "express";
import jwt from "jsonwebtoken";
export default class BaseRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter(){ //Va para acceder al router de express desde afuera
        return this.router;
    }
    init(){} //Aun no nos interesa

    //porque ...callbacks? Porque, seguramente no solo se utilize el callback de siempre(req,res) sino que tambien venga con middlewares, asi con el spreed, nos aseguramos de abstraer todos los cb que nos manden
    get(path,policies,...callbacks){
        //Como no podemos darle al router todos los callbacks de una para ejecutarlos, necesitamos creamos una funcion que los ejecute, acá aparece applyCallbacks
        this.router.get(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    post(path,policies,...callbacks){
        this.router.post(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    put(path,policies,...callbacks){
        this.router.put(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    delete(path,policies,...callbacks){
        this.router.delete(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    //Respuestas globales
    generateCustomResponses = (req,res,next)=>{
        res.sendSuccess = message => res.send({status:"Success",message})
        res.sendSuccessWithPayload = payload => res.send({status:"Success",payload})
        next();
    }

    //Contenedor de Roles
    handlePolicies = policies =>{
        return (req,res,next)=>{
            if(policies[0]=== "PUBLIC") return next();

            //VERIFICACION DEL TOKEN MEDIANTE LOS HEADERS
            const authHeaders =req.headers.authorization;
            if(!authHeaders) return res.status(401).send({status:"Error", error:"Unauthorized"})
            const token = authHeaders.split(" ")[1];
            const user = jwt.verify(token,'tokenSecret');

            //Si llegamos acá, entonces ya tenemos el user

            //Si NO esta el rol del usuario
            if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status:"Error", error:"Forbidden"})
            req.user = user;
            next();
        }
    }


    //Aplicador de callbacks
    applyCallbacks (callbacks){

        return callbacks.map(callback =>async(...params)=>{ //para cada callback, toma todos los params que tiene la cb
            try {
                await callback.apply(this, params) //quiero que apliques ESTA funcion(callback.apply), dentro de ESTE(this) contexto, con ESTOS parametros(params)
            } catch (error) {
                //Si algo sale mal en algun callback
                params[1].status(500).send(error) //params[1] es la posicion de res en un middleware ==> (req[0],res[1],next[2])
            }
        }) 
    }

}