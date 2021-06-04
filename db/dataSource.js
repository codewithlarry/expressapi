const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
const {
  DATABASE_ENGINE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_NAME,
  DATABASE_POOLSIZE
} = process.env;

const dataSource = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_ENGINE,
    pool: {
        max: parseInt(DATABASE_POOLSIZE)
     }
  }
);

module.exports = dataSource;