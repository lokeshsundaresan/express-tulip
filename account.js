const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccountSchema = new Schema(
  {
    username:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String},
 
  });


// Export the model
module.exports = mongoose.model('adminaccount', AccountSchema);