const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    
    category_name:{type: String, required: true},
    subcategory_name:{type: String, required: true},
    product_name:{type: String, required: true},
    product_code: {type: String, required: true},
    description: {type: String, required: true},
    min_order: {type: Number},
    price: {type: Number,required: true},
    discount: {type: Number},
    remarks:{type:String},
    status:{type:String,required: true},
    product_image:{type:String,required: true}
  });


// Export the model
module.exports = mongoose.model('products',ProductSchema);