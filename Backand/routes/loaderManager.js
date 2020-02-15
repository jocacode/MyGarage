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

 /*1. LoadPosts(id) Ucitaj sve postove iz baze koji su vezani za 
 automobile koje user sa zadataim idjem poseduje. Prikazuju se n najboljih po lajkovima
 i sledeci load posts odnosno lik na + dodaje u listu prikazanih na frontendu jos n u nastavku 
 i tako sve dok ima postova*/

 /*2. LoadCarPosts(CarName) Ucitava sve postove za automobil specificirane marke i trebalo bi
 da izlista postove koji se odnose samo na taj automobil.*/

 /*3. LoadUserCars(id) Ucitava sve automobile usera odnosno vraca objekte tipa Car koji sadrze sve 
 informacije o automobilu koji je parkiran od strane usera id. Prikazuju se u sekciji MY CARS*/



module.exports = router;