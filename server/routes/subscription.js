const express = require ('express');
const Subscription = require('../models/Subscription');
const { verifyToken } = require('../middleware/verifyToken.js');

const router = express.Router();

//POST - Create or update subscription
router.post('/', verifyToken, async(req, res)=>{
    const {address, milkQuantity, deliveryFrequency, notes} =req.body;

    try{
        const existing = await Subscription.findOne({userId: req.user._id});
        if(existing){
            existing.address = address;
            existing.milkQuantity = milkQuantity;
            existing.deliveryFrequency = deliveryFrequency;
            existing.notes = notes;
            await existing.save();
            return res.json({message: 'Subscription updated', subscription: existing});
        }

        const subscription = new Subscription({
            userId: req.user._id,
            address,
            milkQuantity,
            deliveryFrequency,
            notes,
        });

        await subscription.save();
        res.status(201).json({message: 'Subscription created', subscription});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "server error"});
    }

    //Get -- fetcch subscription

    router.get('/', verifyToken, async(req, res)=>{
        try{
            const subscription = await Subscription.findOne({userId: req.user._id});
            if(!subscription){
                return res.status(404).json({message: 'No Subscription found'});
            }
            res.json(subscription);
        }catch(err){
            console.error(err);
            res.status(500).json({message: 'Server error'});
        }
    })

});

module.exports = router;