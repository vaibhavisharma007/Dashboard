import mongoose from "mongoose";
const ProductSchema =new mongoose.Schema(
    {
        // This is the product schema and it prefers to be required things false
        name:{
            type:String,
            required:false
        },
        price:{
            type:Number,
            required:false
        },
        description:{
            type:String,
            required:false
        },
        category:{
            type:String,
            required:false
        },
        rating:{
            type:Number,
            required:false
        },
        supply:{
            type:Number,
            required:false
        }
    },
    {timestamps:true}
);

const Product =mongoose.model("Product",ProductSchema);
export default Product;

