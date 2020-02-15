const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Joi = require('@hapi/joi');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register_user_schema = require('../validation/UserSchema');
const {registerValidation, loginValidation} = require('../validation');


router.post('/Register', async (req, res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.json({Status: error.details[0].message});

    //checking if the user is in database
    const emailExist = await User.findOne({Email: req.body.Email});
    const usernameDuplicate = await User.findOne({Username: req.body.Username});
    if(emailExist || usernameDuplicate) 
        return res.json({Status: 'User already exist with that username and password'});

    //hasing the password
    const salt = await bcryptjs.genSalt(10);
    console.log(salt);
    const hashPassword = await bcryptjs.hash(req.body.Password, salt);

    const user = new User({
        Email: req.body.Email,
        Username: req.body.Username,
        Password: hashPassword,
    });

    const token = jwt.sign({_id: user._id}, process.env.TOKEN);
    
    try{
        const savedUser = await user.save();
        res.json({Success: true, AuthToken: token, savedUser});
    }catch(err){
        res.json({Success: false, Message: err});
    }
})

router.post('/Login', async (req, res) => {

    const {error} = loginValidation(req.body);
    if (error) return res.json({Status: error.details[0].message});

    const userExist = await User.findOne({Username: req.body.Username});
    if(!userExist) return res.json({Status: 'Wrong Username'});

    const validPassword = await bcryptjs.compare(req.body.Password, userExist.Password);
    if(!validPassword) return res.json({Status: 'Wrong Password'});  

    //Create Token
    const token = jwt.sign({_id: userExist._id}, process.env.TOKEN);
    res.json({AuthToken: token, userExist});

})


module.exports = router;