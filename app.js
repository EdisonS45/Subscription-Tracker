import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express();
const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.send("Welcome to the Subscription Tracker API");
})

app.listen(PORT,()=>{
    console.log(`Subscription Tracker API listening on PORT: ${PORT}`)
})
