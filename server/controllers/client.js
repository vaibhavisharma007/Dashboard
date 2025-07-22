// Imports: MongoDB models
import Product from "../models/Product.js";
import ProductStat from "../models/Productstat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
/**
 * GET /products
 * Retrieves a list of all products, each enriched with their associated statistics.
 *
 * This endpoint is commonly used to populate product dashboards or reports where both
 * product details and performance metrics (stored separately) are needed.
 */
export const getProducts = async (req, res) => {
  try {
    // Step 1: Fetch all product documents
    const products = await Product.find();

    // Step 2: For each product, retrieve corresponding statistics from ProductStat collection
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stats = await ProductStat.find({ productId: product._id });

        // Return a merged object combining product data and its stats array
        return { ...product._doc, stats };
      })
    );

    // Step 3: Send the final combined list
    res.status(200).json(productsWithStats);
  } catch (err) {
    // Error response for DB or runtime errors
    res.status(404).json({ error: err.message });
  }
};

/**
 * GET /customers
 * Retrieves all users who have the role of "user", excluding their passwords.
 *
 * Useful for admin panels or customer management systems.
 */
export const getCustomers = async (req, res) => {
  try {
    // Fetch all users with role === "user"
    // Exclude password field from the result set for security
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/**
 * GET /transactions
 * Retrieves a paginated, searchable, and sortable list of transactions.
 *
 * Query Parameters:
 *   - page (number): Page number for pagination (default: 1)
 *   - pageSize (number): Number of records per page (default: 20)
 *   - sort (JSON string): Sorting object in format { field: string, sort: "asc" | "desc" }
 *   - search (string): Text to search by 'cost' or 'userId'
 *
 * Returns:
 *   - transactions: List of transaction documents
 *   - total: Total number of matching transactions
 *   - page: Current page number
 *   - pageSize: Number of items per page
 *   - totalPages: Calculated total number of pages
 */
export const getTransactions = async (req, res) => {
  try{
    const {page=1,pageSize=20,sort=null,search=""}=req.query;
    // Generate the sort object
    const generateSort=()=>{
      const sortParsed=JSON.parse(sort);
      const sortFormatted={
        [sortParsed.field]:(sortParsed.sort==="asc"?1:-1),
      };
      return sortFormatted;
    };
    const sortFormatted=Boolean(sort)?generateSort():{};
    let searchQuery={};
    if(search){
      searchQuery={
        $or:[
          {cost:{$regex:new RegExp(search,"i")}},
          {userId:{$regex:new RegExp(search,"i")}},
        ]
      }
    }
    const pageNum = Number(page);
    const pageSizeNum = Number(pageSize);
    const skip = (pageNum - 1) * pageSizeNum;
    const transactions = await Transaction.find(searchQuery)
      .sort(sortFormatted)
      .skip(skip)
      .limit(pageSizeNum);  

    const total=await Transaction.countDocuments(searchQuery);
    const totalPages = Math.ceil(total / pageSizeNum);
      
    res.status(200).json({
      transactions,
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages
    });    
  }
  catch(err){
  res.status(404).json({error:err.message});
}
};

export const getGeography =async (req,res)=>{
  try{
    const users=await User.find();
    //two country symbol to three country symbol npm i country-iso-2-to-3 
    const mappedLocations=users.reduce((acc,{country})=>{
      const countryISO3 = getCountryIso3(country);
      if(!acc[countryISO3]){
        acc[countryISO3]=0;
      }
      acc[countryISO3]++;
      return acc;
    },{});

    const formattedLocations=Object.entries(mappedLocations).map(
      ([country,count])=>{
        //this is the format required for the chart
        return {id:country,value:count};
      }
    );
    res.status(200).json(formattedLocations);
  }
  catch(err){
    res.status(404).json({error:err.message});
  }
} 