import {Router} from 'express'
import { Lead } from './controllers.js'
const router = Router()

router.get('/',(req,res)=>res.sendStatus(200))
router.post('/leadTest',async(req,res,next)=>{
    let lead = new Lead(
        req.body.firstName,
        req.body.lastName,
        req.body.location,
        req.body.email,
        req.body.phone,
        req.body.make,
        req.body.model,
        req.body.issue
    )
    await lead.record()
    res.json(lead)
})
export default router