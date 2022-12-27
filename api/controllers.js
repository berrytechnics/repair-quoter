import { LeadModel, PriceListModel } from "./models.js";

export class PriceList{
    constructor(type,make,model,digitizer,lcd,battery,chargePort,rearCamera,frontCamera,earSpeaker,loudSpeaker,rearGlass){
            type=this.type
            make=this.make
            model=this.model
            digitizer=this.digitizer
            lcd=this.lcd
            battery=this.battery
            chargePort=this.chargePort
            rearCamera=this.rearCamera
            frontCamera=this.frontCamera
            earSpeaker=this.earSpeaker
            loudSpeaker=this.loudSpeaker
            rearGlass=this.rearGlass
    }
    async create(){PriceList.create(this)}
    async update(){PriceListModel.update(this)}
    static async remove(id){PriceListModel.remove(id)}
    static async find(id) {PriceListModel.findOne({where:{id:id}})}
}

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
        this.id=null
        this.price=0
        this.emailed
        this.responded
        this.converted
    }
    async getPrice(){
        // const pricelist = await PriceListModel.findOne({where:{model:this.model}})
        // return this.price = pricelist[this.issue]
        this.price = 19.99
    }
    async emailQuote(){
        this.emailed = true
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
        for(const [key, val] of Object.entries(recordedLead[0].dataValues)) this[key] = val
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