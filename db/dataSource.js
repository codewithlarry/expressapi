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

const dataSources = [];

dataSources[0] = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: 'mysql',
    pool: {
        max: parseInt(DATABASE_POOLSIZE)
     }
  }
);

dataSources[1] = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: 'postgres',
    pool: {
        max: parseInt(DATABASE_POOLSIZE)
     }
  }
);

module.exports = dataSources[currentDataSourceId];