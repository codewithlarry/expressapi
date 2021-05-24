const dotenv = require("dotenv");
const { QueryTypes,Sequelize } = require("sequelize");

dotenv.config();
const {
  DATABASE_MY_ENGINE,
  DATABASE_MY_HOST,
  DATABASE_MY_PASSWORD,
  DATABASE_MY_USERNAME,
  DATABASE_MY_PORT,
  DATABASE_MY_NAME,
} = process.env;

const dataSource = new Sequelize(
  DATABASE_MY_NAME,
  DATABASE_MY_USERNAME,
  DATABASE_MY_PASSWORD,
  {
    host: DATABASE_MY_HOST,
    port: DATABASE_MY_PORT,
    dialect: DATABASE_MY_ENGINE,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
     }
  }
);
const query = async (querystr) =>{
    const results = await dataSource.query(querystr, { type: QueryTypes.SELECT });
    console.log(results);
}
query("select 1 as solution");

