const {Model, DataTypes} = require("sequelize");
const dataSource = require('../dataSource');

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
    }
},{
    sequelize:dataSource,
    tableName: "products"
});
module.exports = Products;
