// create server
/// connect database 
/// create sechme 


const express = require("express");
const mongoose = require('mongoose');
const { stringify } = require("querystring");

const app = express();

const port = 8001;


// Connection to database
mongoose.connect('mongodb://localhost:27017/test');


const databaseConnection = async()=>{

    try {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log("DataBase is connect")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}
app.listen(port,async()=>{
    console.log(`Server is running at http://localhost:${port}`)
   await databaseConnection();
})

const productScheme = new mongoose.Schema({
    id : String,
    name: String,
    price: Number
});

const productModel = mongoose.model("Products",productScheme)

app.get("/",(req,res)=>{
    res.send("Wel to Home page")
})

app.get("/api/products",(req,res)=>{
    res.send(" Products are here")
})