import express from 'express'
import {sequelize} from './database.js'
import routes from './routes.js'
const app = express()
app.use('/', routes)
app.use((err, req, res, next) => {
    err ?
    res.json(err.stack) :
    res.json({error:'An unknown error occurred!'})
})
app.listen(process.env.PORT, async() => {
    try{
        await sequelize.sync({force:true})
        console.log(`Server started...`)
    }
    catch(e){
        console.error(e.stack)
        process.exit(1)
    }
})
export default app
