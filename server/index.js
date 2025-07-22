import express from 'express';//loading express frameword for building server it handles http req
import bodyParser from 'body-parser';//Middleware for parsing incoming request bodies. 
import mongoose from 'mongoose';
import cors from 'cors';//, allowing your server to respond to requests from different domains 
import dotenv from 'dotenv';//Loads environment variables from a .env file into process.env. 

import helmet from 'helmet';//Adds security headers to your HTTP responses
import morgan from 'morgan';//HTTP request logger for monitoring and debugging traffic hitting your server
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';


/*CONFIGURATION */
dotenv.config();//initialising the env variables
const app=express();//creating app instance of express framework
app.use(express.json());//Middleware that parses incoming requests with JSON payloads
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));//Customizes Helmet to allow resources (like images or fonts) to be loaded cross-origin.
app.use(morgan("common"));//- Uses Morgan’s "common" format to log concise info about each request

app.use(bodyParser.json({limit:"30mb",extended:true}));//red
app.use(bodyParser.urlencoded({limit:"30mb",extended:false}));
app.use(cors());



/* ROUTES */
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, {
}).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


}).catch((error) => {
  console.error(`${error} Database connection failed`);
});
app.get('/',(req,res)=>{
    console.log("hello");
    res.send("Hello World");
})
