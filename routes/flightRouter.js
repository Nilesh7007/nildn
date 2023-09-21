const express = require('express');
const flightRouter = express.Router();
const FlightModel = require('../model/flightModel');

// Get all flights
flightRouter.get("/flights",async(req,res)=>{
    try {
        const flights=await FlightModel.find()
       
        res.status(200).json(flights);
    
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
    })

// Get a specific flight by ID
flightRouter.get("/flights/:id",async(req,res)=>{
    try {
        const flights= await FlightModel.findById(req.params.id)

        res.status(200).json(flights);
    
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
    })

// Add a new flight
flightRouter.post('/flights', async (req, res) => {
  try {

    const{airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body;
    const flight = new FlightModel(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Error creating flight' });
  }
});

// Update a flight by ID
flightRouter.patch("/flights/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await FlightModel.findByIdAndUpdate(id, req.body);
        res.send("Flight updated Successfully !!")
    
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});


// Delete a flight by ID
flightRouter.delete("/flights/:id",async(req,res)=>{
    try {
     const id=req.params.id;
     const flight=await FlightModel.findByIdAndDelete(id)
     res.send("Flight Deleted Sucessfully !!")
    } catch (error) {
     res.status(400).json({ msg: error.message });
    }
 })

module.exports = flightRouter;
