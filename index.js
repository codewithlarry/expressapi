const express = require("express");
const productsRouter = require("./router/Products");
const errorHandler = require("./error/errorHandler");
const { NotFoundError } = require("./error/errors");

const app = express();

/**Some examples use bodyParser, however, express use bodyParser as well. */
//app.use(bodyParser.json());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//load routers
app.use("/products", productsRouter);

app.all('*', (req, res, next) => {
    throw new NotFoundError("Not found the uri "+req.path);
});

//errorhandler must be put after routers
app.use(errorHandler);

app.listen({ port: 8000}, () =>{
    console.log("API service started on port 8000");
});