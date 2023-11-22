import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js"
import cors from 'cors';
import path from "path";


//configure
dotenv.config();


//database config
connectDB();



//rest objecct
const app = express()

//middlware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '.client/dist')))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)



//rest api
app.use('*', function (req, res) {
    res.sendFile(path(__dirname, './client/dist/index.html'))
})

//Port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});

