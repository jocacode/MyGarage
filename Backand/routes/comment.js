const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/GetComments/:postId', async(ctx) => {
    try{
        const comments = await Comment.find({PostId: ctx.params.postId});
        ctx.res.json(comments);
    }catch(err){
        ctx.res.json({message: '' + err});
    }
});

router.post('/AddComment',  async (req, res) => {
    let comment = new Comment({
        Content: req.body.Content,
        PostId: req.body.PostId,
        UserId: req.body.UserId
    });
    try{
        const savedComment = await comment.save();
        res.json(savedComment);
        }
    catch(err){
        res.json({message: err});
    }
})

router.delete('/DeleteComment/:id', async (ctx) => {
    try{
        const removedComment = await Comment.remove({_id: ctx.params.id});
        ctx.res.json(removedComment);
    }catch(err){
        ctx.res.json({message: '' + err});
    }
})


module.exports = router;