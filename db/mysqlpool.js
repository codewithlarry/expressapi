// reference: https://www.npmjs.com/package/mysql2
// https://github.com/mysqljs/mysql#pooling-connections
// why mysql2 instead of mysql? The prior one has better performance and faster
// es8(es2017) starts to support async/await
// why and when should db pool be used?
const dotenv = require("dotenv");
const mysql = require('mysql2/promise');

dotenv.config();
const {
    DATABASE_MY_HOST,
    DATABASE_MY_PORT,
    DATABASE_MY_NAME,
    DATABASE_MY_PASSWORD,
    DATABASE_MY_USERNAME,
    DATABASE_MY_POOLSIZE
} = process.env;

const pool  = mysql.createPool({
    host     : DATABASE_MY_HOST,
    port     : DATABASE_MY_PORT,
    database : DATABASE_MY_NAME,
    user     : DATABASE_MY_USERNAME,
    password : DATABASE_MY_PASSWORD,
    connectionLimit : DATABASE_MY_POOLSIZE
});
console.log("Created a connection pool with 10 active connections to MySQL");

const initDb = async () =>{
    try{
        let connection = await pool.getConnection();
        console.log("Manually acquired a connection from the pool");
        let createtableresult = await connection.execute("CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))");
        console.log("Created table customers");
        let insertresult = await connection.execute("INSERT INTO customers( name , email ) values ( 'Tom' , 'tom@test.com'),( 'Jerry' , 'jerry@test.com');");
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
        let [rows, fields] = await pool.query("SELECT id,name,email from customers");
        console.log("Queried data from table customers");
        console.log(rows);
    }catch(err){
        console.error(err);
    }
};

const closePool = async () => {
    await pool.end();
    console.log("Close all connections to MySQL");
};

const run = async () =>{
    await initDb();
    await query();
    await closePool();
};

run();


