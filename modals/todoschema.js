const mongoose = require('mongoose');

const TodoSchema =  mongoose.Schema({
    useremail :{ type: String, required: true},
    name: { type: String },
    Description : { type : String},
    Assignee : { type : String },
    Reporter : { type : String},
    Startdate : { type : String },
    Enddate : { type : String},
    status : {type : String},
    postedBy:{type : String},
    number: {type: String}
    
  });

module.exports = mongoose.model('Todoionic', TodoSchema);