//reference: https://node-postgres.com/features/connecting
//https://github.com/brianc/node-postgres/tree/master/packages/pg-pool
const dotenv = require("dotenv");
const { Pool, Client } = require('pg');

dotenv.config();

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USERNAME
} = process.env;

const pool = new Pool({
        max: 10, // set pool max size to 10 
        host     : DATABASE_HOST,
        port     : DATABASE_PORT,
        database : DATABASE_NAME,
        user     : DATABASE_USERNAME,
        password : DATABASE_PASSWORD,
});
console.log("Created a connection pool with 10 active connections");

const initDb = async () =>{
    try{
        let connection = await pool.connect();
        console.log("Manually acquired a connection from the pool");
        let createtableresult = await connection.query("CREATE TABLE IF NOT EXISTS customer (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))");
        console.log("Created table customer");
        let insertresult = await connection.query("INSERT INTO customer( name , email ) values ( 'Tom' , 'tom@test.com'),( 'Jerry' , 'jerry@test.com');");
        console.log("Inserted customer data");
        await connection.release();
        console.log("Release this connection to the pool");
    }catch(err){
        console.error(err);
    }
};

const query = async () => {
    try{
        console.log("Automatically acquired a connection from the pool");
        let result = await pool.query("SELECT id,name,email from customer");
        console.log("Queried data from table customer");
        console.log(result.rows);
    }catch(err){
        console.error(err);
    }
}

const closePool = async () => {
    await pool.end();
    console.log("Close all connections to the database.");
}

const run = async () =>{
    await initDb();
    await query();
    await closePool();
}

run();
