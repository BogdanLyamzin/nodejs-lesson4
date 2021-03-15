const express = require("express");
const cors = require("cors");
const {v4} = require("uuid");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

const {productsRouter} = require("./routes");

app.use("/products", productsRouter);

app.listen(3000);