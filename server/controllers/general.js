import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser=async (req,res)=>{
    try{
        const {id}=req.params;
        const user =await User.findById(id);
        res.status(200).json(user);
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

export const getDashboardStats=async (req,res)=>{
    try{
        //hardcoded values
        const currentMonth = "November"; //Month name
        const currentYear = 2021; //Year
        const currentDate = "2021-11-15"; //YYYY-MM-DD


        // recent Transactions
        const transactions= await Transaction.find().limit(50).sort({createdOn:-1});

        // overallStats
        const overallStat=await OverallStat.find({year:currentYear});
        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            
        }
        = overallStat[0];

        const thisMonthStats=overallStat[0].monthlyData.find(({month})=>month===currentMonth);

        const todayStats=overallStat[0].dailyData.find(({date})=>date===currentDate);

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            thisMonthStats,
            todayStats,
            transactions
        })

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}
