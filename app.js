const express=require('express')
const userrouter=require('./routes/user-router')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const indexrouter=require('./routes/index.routes')
const cookieparser=require('cookie-parser')
app.use(cookieparser())

const connectToDb = require('./config/db')
connectToDb();

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',indexrouter)
app.use('/',userrouter)
app.get("/",(req,res)=>{
    res.render('main')
})
app.listen(3000,(port)=>{
    console.log("server started at port:3000")

})