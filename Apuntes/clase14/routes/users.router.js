import { Router } from "express";
import userModel from "../src/models/user.js";
const router = Router();


router.get('/', async (req,res)=>{ //No olvidar el async
    const users = await userModel.find();
    res.send({status:"Success", payload:users})
})

router.post('/', async(req,res)=>{
    const {first_name, last_name, email, password} = req.body;
    if (!first_name||!last_name||!email||!password)return res.status(400).send({status:"error",error:"Incompleted fields"})
    const user = {
        first_name,
        last_name,
        email,
        password
        //"__v=0" significa cual es la version del archivo
    }
    const result = await userModel.create(user); //Para crear UNO, usar create
    res.send({status:"Success", payload:result})
});

router.put('/:uid', async (req, res)=>{
    const userId = req.params.uid;
    const userToUpdate = req.body;
    const result = await userModel.updateOne({_id:userId},{$set:userToUpdate})
    console.log(result)
    res.send({status:"Success", message:"User Updated"})
})

router.delete('/:uid', async (req, res)=>{
    const userId = req.params.uid;
    const result = await userModel.deleteOne({_id:userId})
    console.log(result)
    res.send({status:"Success", message:"User removed"})
})

export default router;