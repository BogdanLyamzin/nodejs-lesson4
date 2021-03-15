const express = require("express");
const Joi = require("joi");
const {v4} = require("uuid");

const productRouter = express.Router();

const products = require("./productList");

productRouter.get("/", (req, res)=> {
    if(req.query.name) {
        const filteredProducts = products.filter(({name}) => name.includes(req.query.name));
        res.json(filteredProducts);
    }
    else {
        res.json(products);
    }
});

productRouter.get("/:id", (req, res)=> {
    const {id} = req.params;
    const result = products.find(({_id}) => id === _id);
    if(result){
        res.json(result);
    }
    else {
        res.json({})
    }
});

productRouter.post("/", express.json(), (req, res)=> {
    const productShema = Joi.object({
        name: Joi.string().min(2).required()
    });
    const {error, value} = productShema.validate(req.body);
    if(error){
        res.statusCode = 400;
        res.json({
            status: "Error",
            message: error.details[0].message
        });
    }
    else {
        const newProduct = {
            _id: v4(),
            name: req.body.name
        };
        products.push(newProduct);
        res.json(newProduct);
    }

});

productRouter.put("/:id", express.json(), async (req, res)=> {
    const {id} = req.params;

    const productShema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().min(2).required()
    });

    try {
        const value = await productShema.validateAsync(req.body);
        const updateProduct = products.find(({_id}) => id === _id);
        if(updateProduct) {
            updateProduct.name = req.body.name;
            res.json(updateProduct);
        }
    }
    catch(err) {
        res.statusCode = 400;
        res.json({
            status: "Error",
            message: err.details[0].message
        });
    }

    const updateProduct = products.find(({_id}) => id === _id);
    if(updateProduct) {
        updateProduct.name = req.body.name;
        res.json(updateProduct);
    }
});

productRouter.delete("/:id", (req, res)=> {
    const {id} = req.params;
    const deleteID = products.findIndex(({_id}) => _id === id);
    if(deleteID !== -1) {
        const deleteProduct = products[deleteID]
        products.splice(deleteID, 1);
        res.json(deleteProduct)
    }
});

module.exports = productRouter;