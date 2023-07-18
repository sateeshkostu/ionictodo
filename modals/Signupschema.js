const mongoose = require('mongoose');

const SignupSchema =  new mongoose.Schema({
    fName: { type: String},
    lName: { type: String},
    Email : { type : String},
    Password : { type : String},
    Confirmpassword : { type : String},
    phoneNo : { type : String},
    role: {type : String},
    RooneID:{ type : String},
    team : {type : String}

  });

module.exports = mongoose.model('ionic', SignupSchema);