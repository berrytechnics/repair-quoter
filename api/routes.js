import express from "express"
const router = express.Router()
import {Leads,Devices} from './controllers.js'

router.get("/getQuotes", async (req,res,next) => {
    let id = req.query.id ? req.query.id : false
    try{
        let leads;
        id ? leads = await Leads.getLead(id) : leads = await Leads.getLead()
        res.send(leads)
    }
    catch(err){
        next(err)
    }
})
router.post("/requestQuote", async (req, res, next) => res.sendStatus(200))
router.post("/updateQuote", async (req, res, next) => res.sendStatus(200))
router.delete("/deleteQuote", async (req,res,next) => res.sendStatus(200))
export default router
