const express = require('express');
const Delivery = require('../models/Delivery');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

//Get all deliveries for customer
router.get('/', verifyToken, async(req, res)=>{
    try{
        const delivery = await Delivery.find({userId: req.user.id});
        res.json(delivery);
    }catch(err){
        res.status(500).json({message: 'Failed to fetch delivery records'});
    }
});


//POST or PUT for admi side
router.post('/', verifyToken, async(req,res)=>{
    const {userId, date, items, status} = req.body;

    try{
        const existing = await Delivery.findOne({userId, date});
        if(existing){
            existing.items = items;
            existing.status = status;
            await existing.save();
            return res.json({message: 'Delivery updated', delivery: existing});
        }

        const delivery = new Delivery({userId, date, items, status});
        await delivery.save();
        res.status(201).json({message: 'Delivery Created', delivery});
    }catch(err){
        res.status(500).json({message: 'Failed to save delivery'});
    }
})

module.exports = router;