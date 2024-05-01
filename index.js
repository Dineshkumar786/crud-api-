import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { Product1 } from "./models/productModel.js";

// create a instance  of express.js
export const app =  new express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));



// get api
app.get("/",(req,res)=>{
    res.send("Hii from node api server");
})


//  to add the product using POST Method
app.post('/api/products',async(req,res)=>{
    try{
        const product = await Product1.create(req.body);
        res.status(200).json(product);
    }
    catch(error){
       res.status(500).json({message:error.message});
    }
})

// to get the api products
app.get("/api/products", async(req,res)=>{
    try{
        const products =  await Product1.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


// to get the product using id
app.get("/api/products/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const productId =  await Product1.findById(id);
        res.status(200).json(productId);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


//update a product

app.put("/api/products/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product1.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        const UpdatedProduct =  await Product1.findById(id);
        res.status(200).json(UpdatedProduct);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


//delete a product

app.delete("/api/products/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product1.findByIdAndDelete(id, req.body);

        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"deleted product successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


// a route to delete a product by name
app.delete("/products/:name", async(req,res)=>{
    try{
        const productName= req.params.name;
        const deletedProduct =  await Product1.findOneAndDelete({ name: productName });

        if(!deletedProduct){
            return res.status(404).json({message:"product not found"});
        }
        return res.status(200).json({message:"product deleted successfully"});
    }
    catch(error){
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


dbConnection();

