// create server
/// connect database 
/// create sechme 


const express = require("express");
const mongoose = require('mongoose');
const { title } = require("process");
const { stringify } = require("querystring");
const { v4: uuidv4 } = require('uuid');

const app = express();

const port = 8001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

app.get("/api/products", async(req,res)=>{
   const newProduct = productModel({
    id: uuidv4(),
    title: req.body,
    price: req.body
    
   })
    console.log(req.body,title)
    console.log(req.body,price)
   await newProduct.save();
    res.status(200).send(newProduct);
})