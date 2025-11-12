const mongoose= require("mongoose")
const {commentSchema:comments}=require("./commentModel")
const AppartmentSchema= new mongoose.Schema({
name:{
        type:String,
    },
image:{
        type:String,
    },
city:{
        type:String,
        enum:["שוויץ","ישראל","בלגיה","הולנד"]
    },
size:{
        type:Number
    },
price:{
        type:Number,
        required:true
},
bookings:{
    type:[{sDate:{
        type:Date,
        required:true
    },
    eDate:{
        type:Date,
        required:true
    }}]
},
beds:{
   type:Number,
   required:true
},
discreption:{
    type:String,
    required:true
},
comments:{
    type:[comments]
}
},{timestamps:true})

module.exports =mongoose.model('Appartment',AppartmentSchema)