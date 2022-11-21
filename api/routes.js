import express from 'express'
import { Leads, Devices } from './controllers.js'
const router = express.Router()

router.get('/test', (req, res) => res.sendStatus(200))
router.get('/getDevice', async (req, res, next) => {
    try {
        let devices
        req.query.id
            ? (devices = await Devices.getDevice(req.query.id))
            : (devices = await Devices.getDevice())
        res.send(devices)
    } catch (err) {
        next(err)
    }
})
router.get('/getQuote', async (req, res, next) => {
    try {
        let leads
        req.query.id
            ? (leads = await Leads.getLead(req.query.id))
            : (leads = await Leads.getLead())
        res.send(leads)
    } catch (err) {
        next(err)
    }
})
router.post('/submitQuote', async (req, res, next) => {
    try{
        const lead = await Leads.newLead(
            req.body.firstName,
            req.body.lastName,
            req.body.location,
            req.body.email,
            req.body.phone,
            req.body.make,
            req.body.model,
            req.body.issue
        )
        res.send(lead)
    } catch (err) {
        next(err)
    }
})
router.post('/updateQuote', async (req, res) => {
    /*
    REQ.BODY
    id: "objectID"
    updates: [
        {
            field:"battery",
            content:54.99
        }
    ]
    */
   try{
    const lead = await Leads.updateLead(req.body.id,req.body.updates)
    res.send(lead)
   } catch(err) {
    next(err)
   }
})

export default router
