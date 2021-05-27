const dotenv = require("dotenv");
const { Pool, Client } = require('pg');

dotenv.config();
const {
    DATABASE_PG_HOST,
    DATABASE_PG_PORT,
    DATABASE_PG_NAME,
    DATABASE_PG_PASSWORD,
    DATABASE_PG_USERNAME,
    DATABASE_PG_POOLSIZE
} = process.env;

const pool = new Pool({
    host     : DATABASE_PG_HOST,
    port     : DATABASE_PG_PORT,
    database : DATABASE_PG_NAME,
    user     : DATABASE_PG_USERNAME,
    password : DATABASE_PG_PASSWORD,
    max      : DATABASE_PG_POOLSIZE // set pool max size to 10 
});
console.log("Created a connection pool with 10 active connections to PostGres");

const initDb = async () =>{
    try{
        let connection = await pool.connect();
        console.log("Manually acquired a connection from the pool");
        let createtableresult = await connection.query("CREATE TABLE IF NOT EXISTS customers (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))");
        console.log("Created table customers");
        let insertresult = await connection.query("INSERT INTO customers( name , email ) values ( 'Tom' , 'tom@test.com'),( 'Jerry' , 'jerry@test.com');");
        console.log("Inserted customers data");
        await connection.release();
        console.log("Release this connection to the pool");
    }catch(err){
        console.error(err);
    }
};

const query = async () => {
    try{
        console.log("Automatically acquired a connection from the pool");
        let result = await pool.query("SELECT id,name,email from customers");
        console.log("Queried data from table customers");
        console.log(result.rows);
    }catch(err){
        console.error(err);
    }
};

const closePool = async () => {
    await pool.end();
    console.log("Close all connections to PostGres.");
};

const run = async () =>{
    await initDb();
    await query();
    await closePool();
};

run();
