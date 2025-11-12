const mongoose= require("mongoose")
const {itemSchema:item}=require("./itemModel")
const UserSchema= new mongoose.Schema({
userName:{
        type:String,
        required:true,
        unique:true
    },
name:{
        type:String,
        required:true
    },
phone:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true  
},
userRole:{
    type:String,
    enum:["Admin","user"],
    default:"user"
},
password:{
    type:String,
    required:true  
},
// basket:{
//     type:[item]
// }

},{timestamps:true})

module.exports =mongoose.model('User',UserSchema)