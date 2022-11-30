import C from './constants.js'
import jwt from 'jsonwebtoken'
import bCrypt from 'bcryptjs'
import { Email, VerifyEmail } from './mailer/mailer.js'
import { LeadEntry, Pricelist, User } from './models.js'
import { camelize } from './helpers.js'
const jwtExpiration = () => Date.now() + 1000 * 60 * 60 //1 hour
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
            next(err)
        }
    },
    getToken: async (user) => {
        if (!user.username || !user.password) throw 'Missing Credentials'
        let foundUser = await User.findOne({ username: user.username })
        if (!user) throw 'User not found'
        if (!bCrypt.compareSync(user.password, foundUser.password))
            throw 'Invalid Credentials'
        let token = jwt.sign(
            {
                id: foundUser._id,
                username: foundUser.username,
                exp: jwtExpiration(),
            },
            process.env.JWT_SECRET
        )
        return {
            username: foundUser.username,
            token: token,
        }
    },
    register: async (user) => {
        if (!user.username || !user.password) throw 'Missing Parameters'
        let foundUser = await User.findOne({ username: user.username })
        if (foundUser) throw 'User already exists'
        let newUser = await User.create({
            username: user.username,
            password: bCrypt.hashSync(user.password, 10),
        })
        let token = jwt.sign(
            {
                id: newUser._id,
                username: newUser.username,
                exp: jwtExpiration(),
            },
            process.env.JWT_SECRET
        )
        const email = new VerifyEmail(newUser.username, token, jwtExpiration())
        await email.send()
        return {
            message: 'Check your email for a link to verify your account',
            id: newUser._id,
            user: newUser.username,
            registered: true,
        }
    },
    removeUser: async (token) => {
        const validToken = Users.validateToken(token)
        if (!validToken) throw 'Invalid Token'
        await User.findByIdAndRemove(validToken.id)
        return { message: 'User Deleted' }
    },
    validateToken: (token) => {
        try {
            let receivedToken = jwt.verify(token, process.env.JWT_SECRET)
            let resultToken
            if (receivedToken.exp <= Date.now() - 1000 * 60 * 10) {
                // 10 minutes
                resultToken = jwt.sign({
                    id: receivedToken.id,
                    username: receivedToken.username,
                    exp: jwtExpiration(),
                })
            } else resultToken = receivedToken
            return resultToken
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
}
