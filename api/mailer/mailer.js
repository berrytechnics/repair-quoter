import nodemailer from 'nodemailer'
import { convert } from 'html-to-text'
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url'
import { lookup } from '../helpers.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class Email {
    constructor(to, subject, template, data, sendMsg = true) {
        this.to = to
        this.subject = subject
        this.template = `${__dirname}/${template}.ejs`
        ;(this.data = data), (this.sendMsg = sendMsg)
    }
    async send() {
        let lead = {
            name: this.data.firstName,
            make: this.data.make,
            model: this.data.model,
            issue: lookup(this.data.issue) || this.data.issue,
            price: this.data.price,
        }
        let emailSent = false
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
        let result
        if (!this.sendMsg) {
            result = {}
        } else {
            result = await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: this.to,
                subject: this.subject,
                html: await ejs.renderFile(this.template, lead),
                text: convert(await ejs.renderFile(this.template, lead)),
            })
        }
        result.accepted && this.data.price > 0 ? (emailSent = true) : null
        return emailSent
    }
}
class VerifyEmail{
    constructor(to,token){
        this.to = to
        this.token = token
    }
    async send(){
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:this.to,
            subject:"Verify your account!",
            html:`
            <a href="${process.env.DOMAIN}/verify/${this.token}">Verify your account</a>
            <br />
            <p>This link will expire in 7-days</p>
            `
        })
        return false
    }
}
export { Email,VerifyEmail }
