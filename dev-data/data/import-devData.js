/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const uri = process.env.DATABASE;
// Connect to MongoDB using Mongoose
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB using Mongoose!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
// Call the function to connect
connectToDatabase();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);
console.log(tours);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data created successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
importData();
