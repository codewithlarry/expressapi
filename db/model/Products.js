const {Model, DataTypes} = require("sequelize");
const dataSource = require("../dataSource");

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

module.exports = Products;