const express = require("express");

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
    const newProduct = {
        _id: v4(),
        name: req.body.name
    };
    products.push(newProduct);
    res.json(newProduct);
});

productRouter.put("/:id", express.json(), (req, res)=> {
    const {id} = req.params;
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