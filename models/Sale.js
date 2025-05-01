const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    produceName:{
        type: mongoose.Schema.Types.ObjectId,  // Changed to ObjectId
        ref: "Produce"
    },
    tonnage:{
        type:Number,
        trim:true,
        // required:true,  
    },
    pricePerkg:{
        type:Number,
        trim:true,
        // required:true,  
    },
    amountPaid:{
        type:Number,
        trim:true,
        //required:true,
    },
    qsold:{
        type:Number,
        trim:true,
        //required:true,
    },
    buyerName:{
        type:String,
        trim:true,
        //required:true,
    },
    salesAgentName:{
        type:String,
        trim:true,
        //required:true,
    },
    dateTime:{
        type:Date,
        trim:true,
        //required:true,
    },
    seller:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Signup"
    }
    
})

module.exports = mongoose.model("Sale", saleSchema);