import nodemailer from 'node-mailer';
class Email{
    constructor(to,from,subject,template,data){
        this.to = to;
        this.from = from;
        this.subject = subject;
        this.template = template;
        this.data = data;
    }
    send(){
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        transporter.sendMail(data,(err,info)=>{
            err ?  this._handleError(err) : info
        })
    }
    _handleError(err){
        console.log(err)
    }
}
export { Email }