// const mongoose=require("mongoose")
// const ItemSchema= new mongoose.Schema({

// idAppartement: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() ,
//         ref:'appartment',
//         required:true,
//         unique:true
//     },
// sDate:{
//     type:Date,
//     required:true
// },
// eDate:{
//     type:Date,
//     required:true
// }
// },{timestamps:true})

// module.exports ={ItemSchema}
const mongoose = require("mongoose")
const BasketSchema = new mongoose.Schema({
    idAppartement: {
        type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(),
        ref: 'Appartment',
        required: true,
        //unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(),
        ref: 'User',
        required: true,
        //unique: true
    },
    sDate: {
        type: Date,
        required: true
    },
    eDate: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Basket', BasketSchema)