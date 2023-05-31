import { Router} from "express";
import usersModel from "../dao/mongo/models/User.js";

const router = Router();

router.get('/', async(req, res)=>{
    //Querys
    const {page = 1, limit = 10, group = '1A', sort} = req.query; //Extrae la page de req.query, ysi no existe, entonces igualalo a 1 
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await usersModel.paginate({group},{page, limit,  lean:true}) //Desestructuracion
    const users = docs;
    console.log(limit)
    res.render('users', {users, hasPrevPage, hasNextPage, nextPage, prevPage, page:rest.page, limit:rest.limit})
    // console.log(result)
    // {
    //     docs: [#ACÁ ESTAN LOS USUARIOS],
    //     totalDocs: 0,
    //     offset: 0,
    //     limit: 10,
    //     totalPages: 1,
    //     page: 1,
    //     pagingCounter: 1,
    //     hasPrevPage: false, --> existe una pagina prev?
    //     hasNextPage: false, --> existe una pagina sig?
    //     prevPage: null, --> no existe pagPrev entonces null
    //     nextPage: null --> no existe pagSig entonces null
    // }
      
    // res.render('users', {users:results.docs}) //results.docs es el array de los docs (usuarios en este caso), pero si no se le agrega lean al paginate (linea 7), nos tirará error
})

export default router;