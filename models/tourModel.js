/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'a tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have max group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'a tour should have difficylty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'a tour must have price'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'a tour must have description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
