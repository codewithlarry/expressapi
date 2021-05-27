const dotenv = require("dotenv");
const { QueryTypes,Sequelize } = require("sequelize");

dotenv.config();
const {
  DATABASE_ENGINE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

const dataSource = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: DATABASE_ENGINE,
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

