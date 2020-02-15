const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/GetUser/:userId', async (ctx) => {
    try{
        const user = await User.findOne({_id: ctx.params.userId});
        ctx.res.json(user);
    }catch(err){
        ctx.res.json(err);
    }
});

module.exports = router;