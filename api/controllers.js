import C from './constants.js'
import jwt from 'jsonwebtoken'
import bCrypt from 'bcryptjs'
import { Email, VerifyEmail } from './mailer/mailer.js'
import { LeadEntry, Pricelist, User } from './models.js'
import { camelize } from './helpers.js'
const jwtExpiration = () => Date.now()+(1000*60*60*24) //24 hours
const pageOpts = {
    limit: 25,
    lean: true,
}
export const Leads = {
    getLead: async (id = false, pageNum = 1) => {
        let page
        if (!id) {
            page = await LeadEntry.paginate({
                pagination: pageNum === 'pageless' ? false : true,
                page: pageNum !== 'pageless' ? pageNum : 1,
                limit: pageOpts.limit,
                lean: pageOpts.lean,
            })
        } else
            page = {
                docs: [await LeadEntry.findById(id)],
                totalDocs: 1,
                offset: 0,
                limit: 10,
                totalPages: 1,
                page: 1,
                pagingCounter: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null,
            }
        return page
    },
    updateLead: async (lead) => {
        const updatedLead = await LeadEntry.findByIdAndUpdate(lead._id, lead, {
            new: true,
        })
        await updatedLead.save()
        return updatedLead
    },
    newLead: async (
        firstname,
        lastname,
        location,
        email,
        phone,
        make,
        model,
        issue,
        sendMsg = true
    ) => {
        //create lead from model...
        const lead = new LeadEntry({
            location: location,
            firstName: firstname,
            lastName: lastname,
            phone: phone,
            email: email,
            make: make,
            model: model,
            issue: issue,
            price: 0,
            hidden: false,
        })
        // get quote price...
        const prices = await Pricelist.findOne({ model: lead.model })
        prices ? (lead.price = prices.repairs[camelize(lead.issue)] || 0) : 0
        //check for duplicate lead...
        let duplicates = await LeadEntry.find({
            email: email,
            model: model,
            issue: issue,
            price: lead.price,
        })
        duplicates.length > 0 ? (lead.hidden = true) : (lead.hidden = false)
        // send email and save lead...
        const message = new Email(
            email,
            `Your ${C.brand} Repair Quote is Here!`,
            lead.price > 0 ? 'quote' : 'noQuote',
            lead,
            sendMsg
        )
        const emailResult = await message.send()
        lead.emailed = emailResult ? true : false
        await lead.save()
        return lead
    },
    removeLead: async (id) => {
        await LeadEntry.findByIdAndRemove(id)
        return false
    },
}
export const Devices = {
    getDevice: async (id = false, pageNum = 1) => {
        let page
        if (!id) {
            // find all devices and paginate or don't
            page = await Pricelist.paginate({
                pagination: pageNum === 'pageless' ? false : true,
                page: pageNum !== 'pageless' ? pageNum : 1,
                limit: pageOpts.limit,
                lean: pageOpts.lean,
            })
        }
        // find given device
        else
            page = {
                docs: [await Pricelist.findById(id)],
                totalDocs: 1,
                offset: 0,
                limit: 10,
                totalPages: 1,
                page: 1,
                pagingCounter: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null,
            }
        if (pageNum !== 'pageless' && page.totalDocs > 1) {
            // find all pages without pagination
            page.docs.forEach((device) => {
                // hide prices for repairs - do not like this method
                for (let i = 0; i < device.repairs.length; i++) {
                    device.repairs[i] = 0.0
                }
            })
        } else if (
            pageNum !== 'pageless' &&
            page.totalDocs === 1 &&
            page.docs[0].repairs
        ) {
            // hide prices for single repair - do not like this method
            for (let i = 0; i < page.docs[0].repairs.length; i++) {
                page.docs[0].repairs[i] = 0.0
            }
        } else if (pageNum !== 'pageless')
            // return empty DB
            page = {
                docs: [],
                totalDocs: 0,
                offset: 0,
                limit: 10,
                totalPages: 1,
                page: 1,
                pagingCounter: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null,
            }
        return page
    },
    newDevice: async (type, make, model) => {
        if (!type || !make || !model) throw 'Missing device information!'
        const device = new Pricelist({
            type: type,
            make: make,
            model: model,
        })
        await device.save()
        return device
    },
    updateDevice: async (lead) => {
        const device = await Pricelist.findByIdAndUpdate(lead._id, lead, {
            new: true,
        })
        await device.save()
        return device
    },
    removeDevice: async (id) => {
        await Pricelist.findByIdAndRemove(id)
        return false
    },
}
export const Users = {
    validateToken: (t) => {
        try {
            let receivedToken = jwt.verify(t, process.env.JWT_SECRET)
            let token
            if(receivedToken.exp<=Date.now()-(1000*60*10)){ // 10 minutes
                token = jwt.sign(
                    {
                        id:receivedToken.id,
                        username:receivedToken.username,
                        exp:jwtExpiration()
                    }
                )
            }
            else token = receivedToken
            return token
        } catch (e) {
            return undefined
        }
    },
    verifyEmail: async (token) => {
        const validToken = Users.validateToken(token)
        if (!validToken) throw 'Token invalid or expired'
        const user = await User.findById(validToken.id)
        if (!user) throw 'User not found'
        user.verified = true
        await user.save()
        return user
    },
    auth: async (req, res, next) => {
        try {
            if (!req.headers || !req.headers.authorization) {
                throw 'Token not received'
            }
            let authorization = req.headers.authorization
            let decoded = Users.validateToken(authorization)
            if (!decoded) throw 'Invalid Token'
            let userID = decoded.id
            const user = await User.findById(userID)
            req.user = user
            next()
        } catch (err) {
            res.json({ error: err })
        }
    },
    register: async (req, res) => {
        try {
            let user
            if (!req.body.username || !req.body.password) {
                throw 'Missing Parameters'
            }
            user = await User.findOne({ username: req.body.username })
            if (user) throw 'User already exists'
            user = await User.create({
                username: req.body.username,
                password: bCrypt.hashSync(req.body.password, 10),
            })
            let token = jwt.sign(
                {
                 id:user._id,
                 username:user.username,
                 exp:jwtExpiration
                },
                process.env.JWT_SECRET
            )
            const email = new VerifyEmail(user.username,token,jwtExpiration())
            await email.send()
            res.json({
                message: 'Check your email for a link to verify your account',
                id: user._id,
                user: user.username,
                registered: true,
            })
        } catch (err) {
            res.json({ error: err })
        }
    },
    getToken: async (req, res) => {
        try {
            let user
            if (!req.body.username || !req.body.password) {
                throw 'Missing Parameters'
            }
            user = await User.findOne({ username: req.body.username })
            if (!user) throw 'User not found'
            else {
                if (!user.verified) throw 'User not verified'
                if (!bCrypt.compareSync(req.body.password, user.password)) {
                    throw 'Incorrect Username or Password'
                } else {
                    let token = jwt.sign(
                        {
                         id:user._id,
                         username:user.username,
                         exp:jwtExpiration()
                        },
                        process.env.JWT_SECRET
                    )
                    res.json({ user: user.username, token: token })
                }
            }
        } catch (err) {
            res.json({ error: err })
        }
    },
    removeUser: async (req, res) => {
        const validToken = Users.validateToken(req.headers.authorization)
        try {
            if (!validToken) throw 'Invalid Token'
            await User.findByIdAndRemove(validToken.id)
            res.json({ message: 'User deleted' })
        } catch (err) {
            res.json({ error: err })
        }
    },
}
