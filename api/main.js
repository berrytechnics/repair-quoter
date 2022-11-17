import "dotenv/config"
import express from "express"
import mongoose from 'mongoose'
import routes from "./routes.js"
const app = express()
app.use("/", routes)
app.listen(3000, () => {
    console.log("Server Listening...")
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection
    db.on('error',console.error.bind(console,'connection error:'))
    db.once('open',()=>console.log('Database connected...'))
})
