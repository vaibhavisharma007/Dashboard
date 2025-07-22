import mongoose from "mongoose";
//make all the required false in the schema to false by default
const ProductStatSchema =new mongoose.Schema(
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:false
        },
        yearlySalesTotal:{
            type:Number,
            required:false
        },
        year:{
            type:Number,
            required:false
        },
        monthlyData:[
            // nesting objects in the array to represent each month's data
        
            {
                month:{
                    type:String,
                    required:false
                },
                totalSales:{
                    type:Number,
                    required:false
                },
                totalUnits:{
                    type:Number,
                    required:false
                },
            }
        ],
        dailyData:[
            // nesting objects in the array to represent each day's data
            {
                date:{
                    type:Date,
                    required:false
                },
                totalSales:{
                    type:Number,
                    required:false
                },
                totalUnits:{
                    type:Number,
                    required:false
                },
            }
        ]
    },
    {timestamps:true}
);

const ProductStat =mongoose.model("ProductStat",ProductStatSchema);
export default ProductStat;

