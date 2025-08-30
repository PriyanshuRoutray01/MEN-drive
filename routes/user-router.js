const express=require('express');
const { body, validationResult } = require('express-validator');
const router=express.Router();
const userModel=require('../models/usermodels')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',
    
    body('username').trim().isLength({min:3}),
    body('email').trim().isEmail().isLength({min:10}),
    body('password').trim().isLength({min:5})
    
    ,async (req,res)=>{
        const errors=validationResult(req);
        

        if(!errors.isEmpty()){
           return res.status(400).json({
                errors:errors.array(),
                message:"invalid input"
            })
        }



const {username,email,password}=req.body
const hashedpassword=await bcrypt.hash(password,10);
const newuser= await userModel.create({
    username,
    password:hashedpassword,
    email
})

res.redirect('/login')
    
})

router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login', 
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5})
    ,async (req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty){
           return res.status(400).json({
                errors:errors.array(),
                message:"invalid data"
            })

        }
        const {username,password}=req.body;
        const user=await userModel.findOne({
            username: username.toLowerCase()
        })
        


        if(!user){
           return  res.status(400).json({
                message:"Invalid username or password"
            })
        }

        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({
                message:"invalid username or password"
            })
        }
           const token=jwt.sign({
            username:user.username,
            email:user.email,
            userid:user.id
           },
           process.env.jwt_Secret,
        )

res.cookie('token',token);
res.redirect('/home')



    }
)
router.get('/about',(req,res)=>{
    res.render('about')
})

module.exports=router