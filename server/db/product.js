const mongoose=require("mongoose");

const product=new mongoose.Schema({
    productName: { type:"String", required: true },
    price: { type: "String", required: true },
    tags: { type: "String", required: true },
    imageFile: { type: "String", required: true },
    shippingMethod: { type: "String", required: true },
    sellerName: { type: "String", required: true },
    contactEmail: { type: "String" , required: true},
    description: { type: "String", required: true },
    userId:{type:"string", required: true},

    reviews: [{
        userName: "String",
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    categories:{type:"string", required: true},

})
module.exports=mongoose.model("product",product);