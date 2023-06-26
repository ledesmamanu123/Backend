import { Router } from "express";
import { passportCall } from "../services/auth.js";

export default class BaseRouter{
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){};
    getRouter = () => this.router;

    get(path,policies, ...callbacks){
        this.router.get(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    post(path,policies, ...callbacks){
        this.router.post(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    put(path,policies, ...callbacks){
        this.router.put(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    delete(path,policies, ...callbacks){
        this.router.delete(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    generateCustomResponses = (req,res,next) =>{
        res.sendSuccess = message => res.send({status:"Success",message})
        res.sendSuccessWithPayload = payload => res.send({status:"Success",payload})
        res.sendInternalError = error => res.status(500).send({status:"Error", error})
        res.sendUnauthorized = error => res.status(400).send({status:"Error", error})
        next();
    }

    handlePolicies = (policies) =>{
        return (req,res,next) =>{
            if(policies[0]==="PUBLIC") return next(); //Si es public, seguir

            //Esté ya deberia venir con usuario
            const user = req.user;

            //Si le digo que no tiene que estar autenticado, pero si hay un usuario, entonces si esta auntenticado, tiramos error
            if(policies[0]==="NO_AUTH"&&user) return res.status(401).send({status:"Error",error:req.error})

            //Pero si le digo que no tiene que estar autenticado, y no lo esta, sigue sin problema
            if(policies[0]==="NO__AUTH"&&!user) return next();

            //Acá ya me interesa que exista un usuario
            if(!user) return res.status(401).send({status:"Error",error:req.error})

            //Ya existe el usuario, ya no es public, etc etc
            if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status:"Error", error:"Forbidden"})

            //Despues de todas estas capas, estos sigue
            next();
        }
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params)=>{
            try {
                await callback.apply(this,params);
            } catch (error) {
                return params[1].sendInternalError(error)
            }
        })
    }
}