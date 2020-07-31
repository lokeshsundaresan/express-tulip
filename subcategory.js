const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubcategorySchema = new Schema(
  {
    
    category_name:{type: String, required: true},
    subcategory_name:{type: String, unique : true,required: true},
    subcategory_code: {type: String,unique : true, required: true},
    subcategory_order: {type: Number},
  });


// Export the model
module.exports = mongoose.model('Sub-Category', SubcategorySchema);