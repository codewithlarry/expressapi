const express = require("express");
const productsRouter = require("./router/Products");

const app = express();

/**Some examples use bodyParser, however, express use bodyParser as well. */
//app.use(bodyParser.json());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//load routers
app.use("/products", productsRouter);

app.listen({ port: 8000}, () =>{
    console.log("API service started on port 8000");
});