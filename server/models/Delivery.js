const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date:{
        type: String, //format : yyyy:mm:dd
        required:true,
    },
    items: [{
        product: String,
        quantity: Number,
    }],
    status: {
        type: String,
        enum: [ 'delivered', 'missed', 'pending'],
        default: 'pending',
    },
}, {timestamps: true});

module.exports = mongoose.model('Delivery', deliverySchema);
