import {Router} from 'express'
import { Lead } from './controllers.js'
const router = Router()

router.get('/',(req,res)=>res.sendStatus(200))
router.post('/leadTest',async(req,res,next)=>{
    try{
        const lead = new Lead(req.body)
        res.json(await lead.record())
    } catch(e){next(new Error(e))}
})
export default router