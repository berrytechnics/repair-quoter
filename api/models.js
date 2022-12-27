import {sequelize} from './database.js'
import {DataTypes} from 'sequelize'

export const LeadModel = sequelize.define('Lead',{
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    location:DataTypes.STRING,
    email:DataTypes.STRING,
    phone:DataTypes.STRING,
    make:DataTypes.STRING,
    model:DataTypes.STRING,
    issue:DataTypes.STRING,
    price:DataTypes.FLOAT,
    emailed:DataTypes.BOOLEAN,
    responded:DataTypes.BOOLEAN,
    converted:DataTypes.BOOLEAN
})

export const PriceListModel = sequelize.define('PriceList',{
    type:DataTypes.STRING,
    make:DataTypes.STRING,
    model:DataTypes.STRING,
    digitizer:DataTypes.FLOAT,
    lcd:DataTypes.FLOAT,
    battery:DataTypes.FLOAT,
    chargePort:DataTypes.FLOAT,
    rearCamera:DataTypes.FLOAT,
    frontCamera:DataTypes.FLOAT,
    earSpeaker:DataTypes.FLOAT,
    loudSpeaker:DataTypes.FLOAT,
    rearGlass:DataTypes.FLOAT
})