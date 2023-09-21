const express = require('express');
const bookingRouter = express.Router();
const BookingModel = require('../model/bookingModel');
const UserModel = require("../model/userModel")
const FlightModel = require("../model/flightModel")

// Book a flight
bookingRouter.post("/booking",async(req,res)=>{
    try {
      const {user,flight}=req.body
      const checkuser=await UserModel.findById(user)
      const checkflight=await FlightModel.findById(flight)
 
      if(!checkuser || !checkflight)
      {
         res.status(400).json({ msg: "User or flight Not found" });
      }
 
      const booking=new BookingModel(req.body)
      await booking.save()
      res.status(201).json({msg:"Booking Sucessfully !!"})
 
    } catch (error) {
     res.status(400).json({ msg: error.message });
    }
     })

// Get all bookings with user and flight details
bookingRouter.get("/dashboard",async(req,res)=>{
    try {
        const bookings=await BookingModel.find().populate({
            path: 'user', // Field in BookingModel that references UserModel
            model: 'User', // Model to populate
        })
        .populate({
            path: 'flight', // Field in BookingModel that references FlightModel
            model: 'Flight', // Model to populate
        });
        res.json(bookings)

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})
// Update a booking by ID
bookingRouter.patch("/dashboard/:id",async(req,res)=>{
    try {  
        const{id}=req.params
        // console.log(id)
       await BookingModel.findByIdAndUpdate(id,req.body)
       res.send("Booking updated Sucessfully !!")

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})

// Delete a booking by ID
bookingRouter.delete("/dashboard/:id",async(req,res)=>{
    try {
        const booking=await BookingModel.findByIdAndDelete(req.params.id)
        if(!booking) return res.status(400).json({error:"Booking Not Found"})
        res.status(202).json({msg:"Booking Deleted Sucessfully !"})

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})


module.exports = bookingRouter;
