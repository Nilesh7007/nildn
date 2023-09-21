const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
},{
    versionKey: false
});

BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;


//  {
//     "userId" :"64da1d3b2f567f7a95ed96df"
//     "flightId": "64da1e701fed2cc4ec3e2a0d"
//  }