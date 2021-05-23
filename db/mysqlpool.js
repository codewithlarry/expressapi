// reference: https://www.npmjs.com/package/mysql2
// https://github.com/mysqljs/mysql#pooling-connections
// why mysql2 instead of mysql? The prior one has better performance and faster
// es8(es2017) starts to support async/await
// why and when should db pool be used?
const dotenv = require("dotenv");
const mysql = require('mysql2/promise');

dotenv.config();
const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USERNAME
} = process.env;

const pool  = mysql.createPool({
    connectionLimit : 10,
    host     : DATABASE_HOST,
    port     : DATABASE_PORT,
    database : DATABASE_NAME,
    user     : DATABASE_USERNAME,
    password : DATABASE_PASSWORD
});
console.log("Created a connection pool with 10 active connections");

const initDb = async () =>{
    try{
        let connection = await pool.getConnection();
        console.log("Manually acquired a connection from the pool");
        let createtableresult = await connection.execute("CREATE TABLE IF NOT EXISTS customer (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))");
        console.log("Created table customer");
        let insertresult = await connection.execute("INSERT INTO customer( name , email ) values ( 'Tom' , 'tom@test.com'),( 'Jerry' , 'jerry@test.com');");
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
        let [rows, fields] = await pool.query("SELECT id,name,email from customer");
        console.log("Queried data from table customer");
        console.log(rows);
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


