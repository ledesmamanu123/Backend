import { Router } from "express";
import uploader from "../services/uploader.js";
const router = Router();
const pets = [];
router.get('/', (req, res)=>{
    res.send(pets)
})

router.post('/',uploader.single("image"), (req, res)=>{
    const pet = req.body;
    pets.push(pet)
    res.send({status:"Success", message:"Pet added"})

})

router.put('/:pname', (req, res)=>{

})

router.delete('/:pname', (req, res)=>{

})


export default router