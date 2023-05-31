import { Router } from "express";
import UsersManager from "../dao/mongo/managers/users.js";
import usersModel from "../dao/mongo/models/User.js";

const usersService = new UsersManager(); 
const router = Router();

router.get('/', async(req,res)=>{
    const {page=1, limit=10} = req.query;
    const {docs, hasPrevPage, totalPages, prevPage, hasNextPage, nextPage, ...rest} = await usersModel.paginate({},{page, limit, lean:true})
    const users = docs;
    const prevLink = "";
    const nextLink = "";
    if(!hasPrevPage){prevLink=null}
    if(!hasNextPage){prevLink=null}
    res.send(
        {
            status:'Success', 
            payload:users,
            totalPages:totalPages,
            prevPage:prevPage,
            nextPage:nextPage,
            page:rest.page,
            hasPrevPage:hasPrevPage,
            hasNextPage:hasNextPage,
            prevLink:prevLink,
            nextLink:nextLink

        
        })
})

router.post('/', async (req,res)=>{
    const users = req.body;
    const result = await usersService.addManyUsers(users)
    res.send({status:"Success", message:'Users added'})
})

export default router;