import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes.js'
const app = express()
app.use('/', routes)
app.use((err, req, res, next) => !err ? next() : res.status(500).send(`${err}`))
app.all('*', (req, res) => res.sendStatus(400))
app.listen(process.env.PORT, () => {
    console.log('API Server Listening...')
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Database connection error:'))
    db.once('open', () => console.log('API Database connected...'))
})
