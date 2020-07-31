const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {   
    category_name:{type: String, required: true, unique : true},
    category_code: {type: String, unique : true,required: true},
    category_order: {type: Number, required: true}, unique : true
  });


// Export the model
module.exports = mongoose.model('Category', CategorySchema);