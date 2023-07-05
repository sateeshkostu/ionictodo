const mongoose = require('mongoose');

const SignupSchema =  new mongoose.Schema({
    Name: { type: String},
    Email : { type : String},
    Password : { type : String},
    Confirmpassword : { type : String},
    phoneNo : { type : String}
    
  });

module.exports = mongoose.model('ionic', SignupSchema);