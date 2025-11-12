require('dotenv').config()
const express= require("express")
const cors= require("cors")
const corsOptiens=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const authRoutes=require("./Routes/authRoutes")
const userRoute=require("./Routes/userRoute")
const appartmentRoute= require("./Routes/appartmentRoute")
// const multer = require('multer');
// const path = require('path');


const app=express()
const PORT=process.env.PORT || 2500


app.use(cors(corsOptiens))
app.use(express.json())
app.use(express.static("public"))

connectDB()
  .then(() => {
    console.log('MongoDB connected successfully')
})


app.use('/authUser',authRoutes)
app.use('/user',userRoute)
app.use('/appartment',appartmentRoute)
connectDB()



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})