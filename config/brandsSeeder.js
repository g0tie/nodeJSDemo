const FavoriteBrand = require("../models/FavoriteBrand");
const connectToDb = require("./db.js");
require('dotenv').config()


connectToDb();
FavoriteBrand.insertMany([
    {name: "Adidas"},
    {name: "Nike"},
    {name: "Balenciaga"},
    {name: "Domyos"},
    {name: "Celio"},
    {name: "Kalenji"}
]).then( res => {
    console.log("Brands inserted in database")
    process.exit();

})
.catch(err => console.log(`Error: ${err}`));
