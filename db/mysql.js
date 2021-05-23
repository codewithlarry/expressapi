// reference: https://www.npmjs.com/package/mysql2
// https://www.npmjs.com/package/mysql#establishing-connections
// why mysql2 instead of mysql? The prior one has better performance and faster
// es8(es2017) starts to support async/await
const dotenv = require("dotenv");
const mysql = require('mysql2');

dotenv.config();
const {
    DATABASE_MY_HOST,
    DATABASE_MY_PORT,
    DATABASE_MY_NAME,
    DATABASE_MY_PASSWORD,
    DATABASE_MY_USERNAME
} = process.env;

const conn = mysql.createConnection({
    host     : DATABASE_MY_HOST,
    port     : DATABASE_MY_PORT,
    database : DATABASE_MY_NAME,
    user     : DATABASE_MY_USERNAME,
    password : DATABASE_MY_PASSWORD
});
console.log("Created a connection to MySQL");

conn.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))", (error, result, fields) => {
  if (error) throw error;
  console.log("Created table users in MySQL");
  conn.execute("INSERT INTO users( name , email ) values ( 'Mike' , 'mike@test.com'),( 'Ron' , 'ron@test.com');", (error, result) => {
    if (error) throw error;
    console.log("Inserted users data into MySQL");
    conn.query("SELECT id,name,email from users", (error, rows, fields) => {
        if (error) throw error;
        console.log("Queried data from table users in MySQL");
        console.log(rows);
        conn.end();
        console.log("Closed the connection to MySQL");  //must close connection or the limited connections won't be avaliable soon.
    });
  });
});


