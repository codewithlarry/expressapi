const dataSource = require("./dataSource");
const Products = require("./model/Products");

const initSchema = async () => {
    await dataSource.sync( {alter: true} );
    console.log("Created table products");
};

const initData = async () => {
    let productsCount = await Products.count();
    if(!productsCount){
        await Products.bulkCreate([
            {
                name: "Macbook Pro - 2020 later",
                description: "Fancy and fast",
                userId: 1
            },
            {
                name: "iPhone X ",
                description: "brand new and super fast",
                userId: 1
            }            
        ]);
        console.log("insert data into table products");
    }
};

const queryData = async () => {
    let {rows, count} = await Products.findAndCountAll();
    console.log(rows);
    console.log("We have", count , "products");
}

const run = async () => {
    try{
        await initSchema();
        await initData();
        await queryData();
    }catch(err){
        console.error(err);
    }finally{
        await dataSource.close();
    }
};

run();