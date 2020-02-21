const express = require('express');
const mongoose = require('mongoose');
const Car = require('../models/Car');
const User = require('../models/User');
const pusher = require('../pusher');

const router = express.Router();

router.get('/GetParkedCars/:userId' , async (ctx) => {
    try{
        const cars = await Car.find({UserId: ctx.params.userId});
        ctx.res.json(cars);
    }catch(err){
        ctx.res.json({success: false});
    }
})

router.get('/GetCar/:carId' , async (ctx) => {
    try{
        const car = await Car.findOne({_id: ctx.params.carId});
        ctx.res.json(car);
    }catch(err){
        ctx.res.json({success: false});
    }
})

router.post('/ParkTheCar', async (ctx) => {
    const CarData = ctx.body;
    const car = new Car({
        Brand: CarData.Brand,
        Model: CarData.Model,
        UserId: CarData.UserId,
        Photos: [],
        Year: CarData.Year,
        Engine: CarData.Engine,
        Kilometars: CarData.Kilometars
    });
    try{
        const savedCar = await car.save();
        
        const userToUpdate = await User.findOne({_id: car.UserId}, (error) => {
            if(error) ctx.res.send(error);
        });
        userToUpdate.Cars.push(car._id.toString());
        userToUpdate.save();
        pusher.trigger('add-car','new-car', savedCar);
        ctx.res.json(savedCar);
    }catch(err){
        ctx.res.json({message: err});
    }
})




module.exports = router;
