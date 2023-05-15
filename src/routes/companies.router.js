import { Router } from "express";
import CompaniesManager from "../dao/mongo/Managers/companies.js";


const router = Router();
const companiesService = new CompaniesManager();

router.get('/', async (req, res) =>{
    const companies = await companiesService.getCompanies();
    res.send({status:"Success", payload: companies})
})

router.post('/', async (req, res)=>{
    const {name, legal_name, plan, industry, address} = req.body;
    if(!name||!legal_name||!industry||!address) return res.status(400).send({status:"error", error:"Incompleted values"})
    const company = {
        name,
        legal_name,
        plan,
        industry,
        address
    }
    const result = await companiesService.createCompany(company)
    res.sendStatus(201);
})

router.get('/:cid', async (req, res)=>{
    const {cid} = req.params;
    const company = await companiesService.getCompanyBy({_id: cid});
    if(!company) 
       return res.status(404).send({status:"Error", error: "Company not found" });
    res.send({status:"Success", payload: company});
})

router.post('/', async (req, res)=>{
    const {name, legal_name, plan, industry, address} = req.body;
    if(!name||!legal_name||!industry||!address) return res.status(400).send({status:"error", error:"Incompleted values"})
    const company = {
        name,
        legal_name,
        plan,
        industry,
        address
    }
    const result = await companiesService.createCompany(company)
    res.sendStatus(201);
})

router.put('/:cid', async (req,res)=>{
    const {cid} = req.params;
    const updateCompany = req.body;
    const result = await companiesService(cid, updateCompany);
    res.sendStatus(201);
})

router.delete('/:cid', async(req,res)=>{
    const { cid } = req.params;
    await companiesService.deleteCompany(cid)
    res.sendStatus(201)
})


export default router;