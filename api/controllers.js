import { LeadModel } from "./models.js";

export class Lead{
    constructor(firstName,lastName,location,email,phone,make,model,issue){
        this.firstName=firstName
        this.lastName=lastName
        this.location=location
        this.email=email
        this.phone=phone
        this.make=make
        this.model=model
        this.issue=issue
        this.price
        this.date
        this.emailed
        this.responded
        this.converted
        this.id
    }
    async getPrice(){
        // const pricelist = await PriceListModel.findOne({where:{model:this.model}})
        // return this.price = pricelist[this.issue]
        return this.price = 19.99
    }
    async emailQuote(){
        return this.emailed = true
    }
    async record(){
        await this.getPrice()
        await this.emailQuote()
        const recordedLead = await LeadModel.findOrCreate({
            where:{
                email:this.email,
                model:this.model,
                issue:this.issue
            },
            defaults:this
        })
        this.id = recordedLead.id
        return this
    }
    async update(){
        await LeadModel.update(this)
        return this
    }
    static async find(id){
        return await LeadModel.findOne({where:{id:id}})
    }
}