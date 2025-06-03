const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String, require:true, trim:true
    },
    phone:{
        type: String, require: true, trim: true
    },
    email:{
        type: String, require: true, unique:true, lowercase:true, trim:true
    },
    password:{
        type: String, require: true
    },
    role:{
        type: String, enum:['customer', 'admin'],
        default:'customer'
    }
}, 
{timestamps:true}
);

module.exports = mongoose.model('User', userSchema);