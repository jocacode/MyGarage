const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comment = require('../models/Comment');
const Joi = require('@hapi/joi');
const pusher = require('../pusher');
const {CommentValidation}  = require('../validation');

router.get('/GetComments/:postId', async(ctx) => {
    try{
        const comments = await Comment.find({PostId: ctx.params.postId});
        ctx.res.json(comments);
    }catch(err){
        ctx.res.json({message: '' + err});
    }
});

router.post('/AddComment',  async (req, res) => {

    const {error} = CommentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let comment = new Comment({
        Content: req.body.Content,
        PostId: req.body.PostId,
        UserId: req.body.UserId
    });
    
    try{
        const savedComment = await comment.save();
        pusher.trigger('add-comment', 'new-comment', savedComment);
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
    pusher.trigger('DeleteComment', 'delete-comment', removedComment);
})


module.exports = router;