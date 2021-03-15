const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

const {productRouter} = require("./routes");

app.use("/products", productRouter);

app.listen(port);