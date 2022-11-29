import express from 'express'
import { Leads, Devices, Users } from './controllers.js'
const router = express.Router()
// test 
router.all('/', (req, res) => res.jsonStatus(200))
// devices
router
    .get('/devices', async (req, res) => {
        try {
            res.json(
                await Devices.getDevice(
                    req.query.id || false,
                    req.query.page || 1
                )
            )
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .post('/devices',Users.auth, async (req, res) => {
        try {
            const device = await Devices.newDevice(
                req.body.type,
                req.body.make,
                req.body.model
            )
            res.json(device)
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .put('/devices',Users.auth, async (req, res) => {
        console.log(req.body)
        try {
            let updatedDevice = await Devices.updateDevice(req.body)
            res.json(updatedDevice)
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .delete('/devices',Users.auth, async (req, res) => {
        try {
            await Devices.removeDevice(req.query.id)
            res.json(false)
        } catch (err) {
            res.status(400).send(err)
        }
    })
// leads
router
    .get('/leads',Users.auth, async (req, res) => {
        try {
            res.json(
                await Leads.getLead(req.query.id || false, req.query.page || 1)
            )
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .post('/leads', async (req, res) => {
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
            res.json(lead)
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .put('/leads',Users.auth, async (req, res) => {
        try {
            const lead = await Leads.updateLead(req.body)
            res.json(lead)
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .delete('/leads',Users.auth, async (req, res) => {
        try {
            await Leads.removeLead(req.query.id)
            res.json(false)
        } catch (err) {
            res.status(400).send(err)
        }
    })
// user
router
    .post('/login',(req,res)=>{
        Users.getToken(req,res)
    })
    .post('/register',(req,res)=>{
        Users.register(req,res)
    })
    .all('/user',Users.auth,(req,res)=>{
        res.json({message:"User Authorized",user:req.user})
    })
export default router


