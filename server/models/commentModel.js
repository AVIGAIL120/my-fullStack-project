const mongoose=require("mongoose")
const commentSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
content:{
    type:String
},
stars:{
    type:Number,
    min:0,
    max:5,
    required:true
}
},{timestamps:true})

module.exports =(commentSchema)