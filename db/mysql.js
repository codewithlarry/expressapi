// reference: https://www.npmjs.com/package/mysql2
// https://www.npmjs.com/package/mysql#establishing-connections
// why mysql2 instead of mysql? The prior one has better performance and faster
// es8(es2017) starts to support async/await
const dotenv = require("dotenv");
const mysql = require('mysql2');

dotenv.config();
const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USERNAME
} = process.env;

const conn = mysql.createConnection({
  host     : DATABASE_HOST,
  port     : DATABASE_PORT,
  database : DATABASE_NAME,
  user     : DATABASE_USERNAME,
  password : DATABASE_PASSWORD
});
console.log("Created a connection to the database");

conn.execute("CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))", (error, result, fields) => {
  if (error) throw error;
  console.log("Created table user");
  conn.execute("INSERT INTO user( name , email ) values ( 'Mike' , 'mike@test.com'),( 'Ron' , 'ron@test.com');", (error, result) => {
    if (error) throw error;
    console.log("Inserted user data");
    conn.query("SELECT id,name,email from user", (error, rows, fields) => {
        if (error) throw error;
        console.log("Queried data from table user");
        console.log(rows);
        conn.end();
        console.log("Closed the connection to the database");  //must close connection or the limited connections won't be avaliable soon.
    });
  });
});


