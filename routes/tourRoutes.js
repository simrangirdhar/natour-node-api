const express = require('express');

const router = express.Router();
const {
  getAlltours,
  updateTourById,
  getTourById,
  deleteTourById,
  addNewTour,
} = require('../controller/tourController');

router.route('/').get(getAlltours).post(addNewTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
