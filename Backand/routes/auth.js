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
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is in database
    const emailExist = await User.findOne({Email: req.body.Email});
    const usernameDuplicate = await User.findOne({Username: req.body.Username});
    if(emailExist || usernameDuplicate) return res.json({message: 'User already exist in DataBase!'});

    //hasing the pass
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.Password, salt);

    const user = new User({
        Email: req.body.Email,
        Username: req.body.Username,
        Password: hashPassword,
    });
    
    try{
        const savedUser = await user.save();
        res.json(savedUser._id);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/Login', async (req, res) => {

    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExist = await User.findOne({Username: req.body.Username});
    if(!userExist) return res.status(400).send("Wrong Username");

    const validPassword = await bcryptjs.compare(req.body.Password, userExist.Password);
    if(!validPassword) return res.status(400).send("Wrong Password");

    //Create Token
    const token = jwt.sign({_id: userExist._id}, 'tokencic');
    res.header('auth-token', token).send(token);

})


module.exports = router;