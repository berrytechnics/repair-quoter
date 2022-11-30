import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
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
    console.log(`API Server Listening on ${process.env.PORT}...`)
})
export default app
