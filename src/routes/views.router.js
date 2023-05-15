import { Router } from "express";
import CompaniesManager from "../dao/mongo/Managers/companies.js";

const router = Router();
const companiesService = new CompaniesManager();

router.get('/', async (req,res)=>{
    const companies = await companiesService.getCompanies()
    console.log(companies) //el objeto viene hidratado, nos llega con muchas más informaciones de la q necesitamos
    res.render('companies', {companies})

})

export default router;