const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    milkQuantity:{
        type: Number,
        required: true,
    },
    deliveryFrequency:{
        type: String,
        enum: ['daily', 'alternate', 'occasional'],
        required: true,
    },
    notes: String,
},
{timestamps: true});

module.exports = mongoose.model('Subscription', subscriptionSchema);