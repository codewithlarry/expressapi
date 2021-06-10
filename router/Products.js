const Sequelize = require("sequelize");
const express = require("express");
const Products = require("../db/model/Products");

const Op = Sequelize.Op;
const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        let existedProduct = await Products.findOne({ where: { name: req.body.name } });
        if (existedProduct) {
            throw new Error("product " + req.body.name + "is existed already.");
        }
        let product = await Products.create({
            name: req.body.name,
            description: req.body.description,
            memo: req.body.memo
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        let existedProduct = await Products.findByPk(parseInt(req.params.id));
        if (!existedProduct) {
            throw new Error("Not found product by primary key " + req.params.id);
        }
        let product = await Products.update({
            name: req.body.name,
            description: req.body.description,
            memo: req.body.memo
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        }
        );
        let updatedProduct = await Products.findByPk(parseInt(req.params.id))
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        let existedProduct = await Products.findByPk(parseInt(req.params.id));
        if (!existedProduct) {
            throw new Error("Not Found product by primary key " + req.params.id);
        }
        let result = await Products.destroy({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


router.get("/", async (req, res, next) => {
    try {
        let products = await Products.findAndCountAll({
            where: {
                name:
                {
                    [Op.like]: `%${req.query.q}%`
                }
            },
            limit: parseInt(req.query.limit),
            offset: parseInt(req.query.offset)
        });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        let product = await Products.findByPk(parseInt(req.params.id));
        if (!product) {
            throw new Error("Not found the product by id " + req.params.id);
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;