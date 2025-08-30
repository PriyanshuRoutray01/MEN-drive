const mongoose= require('mongoose')

const fileSchema=mongoose.Schema({
    url:{
        type:String,
        required:[true, 'url is required ']
    },
     public_id: { type: String, required: true },
  
    originalname:{
        type:String,
        required:[true,'original name is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'user is required']
    }



})
const file=mongoose.model('file',fileSchema)
module.exports=file