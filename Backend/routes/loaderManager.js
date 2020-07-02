const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Car = require('../models/Car');
const router = express.Router();

//loading posts on homepage
router.get('/LoadPosts/:userId', async (ctx) => {

   try
   {
        /*Vraca listu parkiranih automobila i njihove objekte u user_cars_object*/
        const user = await User.findOne({_id: ctx.params.userId}, "Cars");
        const user_cars_object = await Car.find().where('_id').in(user.Cars);

        /*Vraca listu parkiranih automobila koji su jedna od marke koju poseduje userId*/
        const brand_list = await Car.find().where('Brand')
                                    .in(user_cars_object.map( el => el.Brand ));
        /*Vraca postove za usera koji se odnose na brendove koje on poseduje u garazi*/
        const posts_for_user = await Post.find().where('CarId')
                                    .in(brand_list.map(el => el._id));

        posts_for_user.sort((post1, post2) => {
            if(post1.Date < post2.Date)
                return 1;
            else -1;
        });
        ctx.res.json(posts_for_user);
   }
   catch(err){
       ctx.res.json({message: '' + err});
   }

});

router.get('/LoadCarPosts/:carBrand', async (ctx) => {
    /*Ucitava postove za automobil koji je trazen sortirane u asc redosledu*/
    try 
    {
        const cars = await Car.find({Brand: ctx.params.carBrand});
        const posts = await Post.find().
                            where('CarId')
                            .in(cars.map(el => el._id));

         posts.sort((post1, post2) => {
            if(post1.LikeCount < post2.LikeCount)
                return 1;
            else -1;
        });
        ctx.res.json(posts);
    }
    catch (error) {
        ctx.res.json({message: '' + error});
    }
});

router.get('/LoadUserCars/:userId', async (ctx) => {
    
    try{
        const cars = await Car.find({UserId: ctx.params.userId});
        ctx.res.json(cars);
    }
    catch(err){
        ctx.res.json({message: '' + err});
    }
});




module.exports = router;