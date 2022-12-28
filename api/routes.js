import {Router} from 'express'
import { Lead, PriceList } from './controllers.js'
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
router.post('/priceTest',async(req,res,next)=>{
    let priceList = new PriceList(
        req.body.type,
        req.body.make,
        req.body.model,
        req.body.digitizer,
        req.body.lcd,
        req.body.battery,
        req.body.chargePort,
        req.body.rearCamera,
        req.body.frontCamera,
        req.body.earSpeaker,
        req.body.loudSpeaker,
        req.body.rearGlass
    )
    res.json(await priceList.create())
    
})
export default router