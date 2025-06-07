const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const genarateToken = (user)=>{
    return jwt.sign(
        {id: user._id, name: user.name, phone:user.phone, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );
};

//@route POST  /api/auth/signup
exports.signup =async(req, res)=>{
    try{
        const {name, phone, email, password} = req.body;

        const checkExistingUser = await User.findOne({email});
        if(checkExistingUser) return res.status(400).json({message: "Email alredy registerd"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            phone,
            email,
            password: hashedPassword,
            role: 'customer'
        })

        const token = genarateToken(user);

        res.status(201).json({
            user:{id: user._id, name: user.name,phone: user.phone, role: user.role},
            token
        });
    }catch(error){
        console.error(error.message);
        res.status(500).json({message:"Server error"});
    }
}

//@route POST  /api/auth/login

exports.login = async(req, res) =>{
    try{
        const{email, password} = req.body;

        //hardcoded admin check
        if(email === "manish@milkly.com" && password === 'manish123'){
            const token = jwt.sign(
                {role: 'admin'},
                process.env.JWT_SECRET,
                {expiresIn: '1d'}
            );
            return res.status(200).json({
                user: {
                    name: 'Admin',
                    role: 'admin'
                    },
                token
            });
        }//if statement closes here

        //lets say email is not registerd
        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).json({message:"Invalid Email"});
        }

        //now check if password matches with he email
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Incorrect Password'});
        }

        const token = genarateToken(user);

        res.status(200).json({
            user:{id: user._id, name: user.name, phone:user.phone, role: user.role},
            token
        });

    }catch(error){
        console.error(error.message);
        res.status(500).json({message:'server error'});
    }
};


