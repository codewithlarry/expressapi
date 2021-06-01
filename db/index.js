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
    userId:{
        type:DataTypes.INTEGER, allowNull:false
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
    }catch(err){
        console.error(err);
    }finally{
        await dataSource.close();
    }
})();
