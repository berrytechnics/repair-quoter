import express from 'express'
import { Leads, Devices } from './controllers.js'
const router = express.Router()
// test routes
router.all('/', (req, res) => res.sendStatus(200))
// devices
router
    .get('/devices',  async (req, res, next) => {
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
    .post('/devices', async (req, res, next) => {
        try {
            const device = await Devices.newDevice(
                req.body.type,
                req.body.make,
                req.body.model
            )
            res.send(device)
        } catch (err) {
            next(err)
        }
    })
    .put('/devices', async (req, res, next) => {
        console.log(req.body)
        try {
            let updatedDevice = await Devices.updateDevice(req.body)
            res.send(updatedDevice)
        } catch (err) {
            next(err)
        }
    })
    .delete('/devices', async (req, res, next) => {
        try {
            await Devices.removeDevice(req.query.id)
            res.send(false)
        } catch (err) {
            next(err)
        }
    })
// leads
router
    .get('/leads', async (req, res, next) => {
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
    .post('/leads', async (req, res, next) => {
        try {
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
    .put('/leads', async (req, res, next) => {
        try {
            const lead = await Leads.updateLead(req.body)
            res.send(lead)
        } catch (err) {
            next(err)
        }
    })
    .delete('/leads', async (req, res, next) => {
        try {
            await Leads.removeLead(req.query.id)
            res.send(false)
        } catch (err) {
            next(err)
        }
    })
export default router