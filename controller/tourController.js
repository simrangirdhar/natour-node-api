/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

const getAlltours = async (req, res) => {
  try {
    console.log(req.query);
    // 1) filtering
    const queryObj = { ...req.query };
    const excludedFileds = ['page', 'sort', 'limit', 'fields'];
    excludedFileds.forEach((el) => delete queryObj[el]);

    //2) advacned filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));
    if (req.query.sort) {
      const sortingFileds = req.query.sort.replace(',', ' ');
      console.log(sortingFileds);
      query = query.sort(sortingFileds);
    } else {
      query.sort('-createdAt');
    }
    //const query= Tour.find(req.query).where('duration').equals(5).where('difficulty').equals('easy');
    const toursList = await query;
    res.status(200).json({
      status: 'success',
      results: toursList.length,
      data: {
        tours: toursList,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'Error',
      message: err,
    });
  }
};
const getTourById = async (req, res) => {
  try {
    const toursList = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: toursList.length,
      data: {
        tour: toursList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Error',
      message: err,
    });
  }
};
const updateTourById = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Error',
      message: err,
    });
  }
};
const deleteTourById = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
const addNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
    console.log(err);
  }
};

module.exports = {
  getAlltours,
  updateTourById,
  getTourById,
  deleteTourById,
  addNewTour,
};
