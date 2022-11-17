import express, { application } from 'express';
const router = express.Router();

router.get('/getDevices',(req,res)=>res.send('Test'))
router.get('/requestQuote',(req,res)=>res.send('Test'))
router.post('/updateQuote',(req,res)=>res.send('Test'))

export default router