const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

const products = require("./productList");

app.get("/products", (req, res)=> {
    // res.set("Access-Control-Allow-Origin", "*")
    res.json(products)
})

app.listen(port);