import { app } from "../index.js";
import mongoose from "mongoose";


export const dbConnection =()=>{
    mongoose.connect("mongodb+srv://dkUser:ImeQGDFmzAu7Fdgu@cluster0.hd6sigw.mongodb.net/?retryWrites=true",
    )
    .then(()=>{
        console.log("connected to database");
        app.listen(3000,()=>{
            console.log("server is listening at port 3000");
        })
    })
    .catch((err)=>{
        console.log("Some error occured while connecting to database:", err);
    });
};


