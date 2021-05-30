const { times } = require('lodash');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;

// schema for the products inside the cart / order 
const ProductCartSchema = new Schema({
    product:{
        type: ObjectId,
        ref: "Product" //comes from Product model
    },
    name:String,
    count:Number,
    price:Number
})
const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

//order schema
const orderSchema = new Schema({
    products:[ProductCartSchema], //schema for products in cart
    transaction_id:{},
    amount:{type: Number},
    address: String,
    updated: Date,
    user: {
        type: ObjectId, 
        ref: "User" //ObjectId comes fromm user model
    }
},{timestamps: true}
);

const Order = mongoose.model("Order", orderSchema)

module.exports = {
    Order,
    ProductCart
} 