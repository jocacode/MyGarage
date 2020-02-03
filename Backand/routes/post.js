const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Car = require('../models/Car');


router.get('/', async (ctx) => {
    try{
        const posts = await Post.find();
        ctx.res.json(posts);
    }
    catch(err){
        ctx.res.json({message: err});
    }
});

router.get('/GetPostByBrand/:brand', async (ctx) => {

    try{
        const car = await Car.findOne({Brand: ctx.params.brand}, (err, response) =>{});
        if(car == null) ctx.res.json({message: "There is no " + ctx.params.brand + " models parked yet"});

        const posts = await Post.find({CarId: car._id},(err,response)=> {
            if(err) res.json({message: err});
        });
        ctx.res.json(posts);
    }
    catch(err){
        ctx.res.json({message:'There was a problem:' + err});
    }
})

router.get('/GetAllComments/:postId', async (ctx) => {
    const postId = ctx.params.postId;
    try{
        const comments = await Comment.find({PostId: postId},
            (err, response) => {
                if(err) ctx.res.json({message: err});
                ctx.res.json(response);
            })
            ctx.res.json(comments);
    }catch(err){
        ctx.res.json({message: err});
    }
})

router.post('/AddPost', async (req, res) => {
    const post = new Post({
        Content: req.body.Content,
        LikeCount: 0,
        DislikeCount: 0,
        CarId: req.body.CarId,
        UserId: req.body.UserId
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }
    catch(err){
        res.json({message: err});
    }
});

router.put('/LikePost/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);

    await Post.findByIdAndUpdate({_id: post._id},
        {LikeCount: post.LikeCount + 1},
        (err, response) => {
            if(err) res.json({message: "Error in updating LikeCount!"});
            res.json(response);
        });
})

router.put('/DislikePost/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);

    await Post.findByIdAndUpdate({_id: post._id},
        {DislikeCount: post.DislikeCount + 1},
        (err, response) => {
            if(err) res.json({message: "Error in updating LikeCount!"});
            res.json(response);
        });
})

router.delete('/DeletePost/:id', async (ctx) => {
    try{
        const removedPost = await Post.remove({_id: ctx.params.id});
        ctx.res.json(removedPost);
    }catch(err){
        ctx.res.json({message: '' + err});
    }
})



module.exports = router;
