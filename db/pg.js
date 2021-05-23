const dotenv = require("dotenv");
const {Client} = require('pg');

dotenv.config();
const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USERNAME
} = process.env;

const conn = new Client({
  max: 10, // set pool max size to 10 
  host     : DATABASE_HOST,
  port     : DATABASE_PORT,
  database : DATABASE_NAME,
  user     : DATABASE_USERNAME,
  password : DATABASE_PASSWORD,
});

console.log("Created a connection to the database");

conn.query("CREATE TABLE IF NOT EXISTS user (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))", (error, result, fields) => {
  if (error) throw error;
  console.log("Created table user");
  conn.query("INSERT INTO user( name , email ) values ( 'Mike' , 'mike@test.com'),( 'Ron' , 'ron@test.com');", (error, result) => {
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


