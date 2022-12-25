import { Sequelize } from "sequelize"
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:'mysql',
        logging:false,
        define:{
            freezeTableName:true
        },
    }
)
export {sequelize}