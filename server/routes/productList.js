const {v4} = require("uuid");

const products = [
    {
        _id: v4(),
        name: "Lenovo X120S"
    },
    {
        _id: v4(),
        name: "Samsung Note 4"
    },
    {
        _id: v4(),
        name: "iPhone X"
    }
];

module.exports = products;