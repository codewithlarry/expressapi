const dataSource = require("./dataSource");
const Products = require("./model/Products");
const { NotFoundError } = require("../error/errors");

const createProductwithUnmanagedTransaction = async () => {
    const t = await dataSource.transaction();
    try {
        let newProduct = await Products.create({
            name: "2021 Ford F150 Lariat",
            description: "3.5L ecoboost, 13.0L/100km, $5,5000",
            memo: "Your dream viecle"
        },{ transaction: t });
        console.log("created product "+newProduct.name+" successfully");
        await Products.update({
            description: "3.5L ecoboost, 13.0L/100km, $5,4000",
            memo: "Your dream truck"
        },
        { where: { id: newProduct.id }, transaction: t }
        );
        console.log("updated product "+newProduct.name+" successfully");
        //throw new NotFoundError("We thow an error even we don't know what it is.");
        await t.commit();
    } catch ( error ) {
        console.log( error );
        await t.rollback();
    }finally{
        await dataSource.close();
    }
};

const createProductwithManagedTransaction = async () => {
    try {    
        const result = await dataSource.transaction(async (t) => {
            let newProduct = await Products.create({
                name: "2020 Ford F150 XLT",
                description: "2.7L ecoboost, 12.3L/100km, $4,5000",
                memo: "Your dream viecle"
            },{ transaction: t });
            console.log("created product "+newProduct.name+" successfully");
            await Products.update({
                description: "2.7L ecoboost, 12.3L/100km, $4,2000",
                memo: "best truck for home use."
            },
            { where: { id: newProduct.id }, transaction: t }
            );
            console.log("updated product "+newProduct.name+" successfully");
            //throw new NotFoundError("We thow an error even we don't know what it is.");
        });
    } catch ( error ) {
        console.log( error );
    }finally{
        await dataSource.close();
    }
};

(async () => {
    createProductwithUnmanagedTransaction();
    createProductwithManagedTransaction();
})();

