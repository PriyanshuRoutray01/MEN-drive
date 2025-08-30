const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        unique:true,
        minlength:[3,'username should be atleast be of 3 characters']
    },
     email:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        unique:true,
        minlength:[10,'email should be atleast be of 10 characters']
    },
     password:{
        type:String,
        trim:true,
        required:true,
        minlength:[5,'password should be atleast be of 5 characters']
    }
})

const user=mongoose.model('user',userSchema)
module.exports=user