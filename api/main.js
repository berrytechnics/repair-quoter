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
    if (!err) next()
    res.json({ error: err })
})
app.all('*', (req, res) => res.json({ error: 'Unknown Error' }))
app.listen(process.env.PORT, () => {
    console.log(`API Server Listening on ${process.env.PORT}...`)
})
export default app
