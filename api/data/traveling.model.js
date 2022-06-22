const mongoose = require('mongoose');

const transportationSchema = mongoose.Schema({
  type: {
    type:String,
    required:true
  }, 
  //duration in hour
  duration: Number
});

const travelingSchema = mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  //number of visiting days 
  length: {
    type: Number,
    min: 1,
  },
  //place staying during visitation eg. hotel, friend's house
  stayAt:{
    type:String,
    required:true
  },
  transportations: [transportationSchema]
});

mongoose.model(process.env.TRAVELING_MODEL,travelingSchema,process.env.TRAVELING_COLLECTION);