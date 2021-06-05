const {Model, DataTypes} = require("sequelize");
const dataSource = require("./dataSource");

class Products extends Model{}
Products.init({
    id:{
        type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true
    },
    name:{
        type:DataTypes.STRING, allowNull:false
    },
    description:{
        type:DataTypes.STRING, allowNull:true
    },
    memo:{
        type:DataTypes.STRING, allowNull:true
    }   
},{
    sequelize:dataSource,
    tableName: "products"
});

(async () => {
    try{
        await dataSource.sync( {alter: true} );
        console.log("table products is created!");
        
        //insert bulk records
        let rowscount = await Products.count();
        console.log("There are ", rowscount, "rows in table products");

        if (rowscount == 0) {
            let bulkproducts = [];
            for(i=0;i<100;i++){
                bulkproducts.push({
                    name: "Macbook "+i,
                    description: "14'/256G/8G"
                });
            }
            await Products.bulkCreate( bulkproducts );
            console.log("Inserted ", bulkproducts.length ," records");

            rowscount = await Products.count();
            console.log("Found", rowscount, "records");
            
        }

        //insert one record
        let iphonex = await Products.create({
            name: "iphone x",
            description: "6'/128G/4k cam/4000mh",
            memo: "brand new"
        });
        console.log("Inserted iphone x");

        //find by primary key
        let iphonexProduct = await Products.findByPk(iphonex.id);
        console.log(JSON.stringify(iphonexProduct));

        //update one record
        await Products.update({
            description: "6'/256G/4k cam/4000mh",
            memo: "fancy and fast"
        },{
            where: { id : iphonex.id}   
        });
        console.log("Updated memo for iphone x");

        //limits and pagination
        let results = await Products.findAll({offset:10, limit:20, order: [ ['name','desc'], ['id'] ]});
        console.log(JSON.stringify(results));

        //remove one record
        await Products.destroy({ where: { id : iphonex.id} });
        console.log("Delete iphone x");

    }catch(err){
        console.error(err);
    }finally{
        await dataSource.close();
    }
})();
