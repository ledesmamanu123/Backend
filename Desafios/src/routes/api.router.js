import { Router } from "express";
import uploader from "../services/uploader.js";
const router = Router();


router.post('/',uploader.single("image"), (req, res)=>{
    res.send({status:"Success", message:"Pet added"})

})

router.put('/:pname', (req, res)=>{

})

router.delete('/:pname', (req, res)=>{

})


export default router