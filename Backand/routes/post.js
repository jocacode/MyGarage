const express = require('express');
const redis = require('redis');
const router = express.Router();

// get post
router.get('/', async (req,res) => {
    res.send('raducka')
}) 

//add post

//delete post







module.exports = router
