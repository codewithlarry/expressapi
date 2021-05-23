const dotenv = require("dotenv");
const {Client} = require('pg');

dotenv.config();
const {
    DATABASE_PG_HOST,
    DATABASE_PG_PORT,
    DATABASE_PG_NAME,
    DATABASE_PG_PASSWORD,
    DATABASE_PG_USERNAME
} = process.env;

const conn = new Client({
    max: 10, // set pool max size to 10 
    host     : DATABASE_PG_HOST,
    port     : DATABASE_PG_PORT,
    database : DATABASE_PG_NAME,
    user     : DATABASE_PG_USERNAME,
    password : DATABASE_PG_PASSWORD
});
conn.connect();
console.log("Created a connection to PostGres");

conn.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))", (error, result) => {
  if (error) console.error(error);
  console.log("Created table users in PostGres");
  conn.query("INSERT INTO users( name , email ) values ( 'Mike' , 'mike@test.com'),( 'Ron' , 'ron@test.com');", (error, result) => {
    if (error) console.error(error);
    console.log("Inserted users data into PostGres");
    conn.query("SELECT id,name,email from users", (error, result) => {
      if (error) console.error(error);
        console.log("Queried data from table users in PostGres");
        console.log(result.rows);
        conn.end();
        console.log("Closed the connection to in PostGres");  //must close connection or the limited connections won't be avaliable soon.
    });
  });
});


