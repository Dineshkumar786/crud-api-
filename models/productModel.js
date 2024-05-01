

import mongoose  from "mongoose";


const productSchema =  mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter product name"],
        },
        quantity:{
            type: Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:true,
            default:0
        },
        image:{
            type:String,
            required:false
        },
        
    },
    {
        Timestamps:true,
    });

export const Product1 = mongoose.model("Product",productSchema);

