import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes.js'
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
app.use((err, req, res, next) => {
    err ? console.log(err) : null
    !err ? next() : res.status(500).send(err)
})
app.all('*', (req, res) => res.sendStatus(400))
app.listen(process.env.PORT, () => {
    console.log('API Server Listening...')
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection
    db.on('error', () => {
        console.log('Database connection error...')
        process.exit(1)
    })
    db.once('open', () => console.log('API Database connected...'))
})
