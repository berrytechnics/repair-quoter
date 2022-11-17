import express from "express"
const router = express.Router()
import { leadController,priceListController } from './controller.js'

router.get("/getDevices", (req, res) => res.send("Test"))

router.get("/requestQuote", (req, res) => res.send("Test"))
router.post("/updateQuote", (req, res) => res.send("Test"))

export default router
