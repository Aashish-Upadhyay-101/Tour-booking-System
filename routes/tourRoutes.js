const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  // checkID,
  // checkBody,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkID); // it is also called params validating / validator (to check or to perform certain operations on the basis of parameters....the 'id' is the key of the req.params object...)

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(createTour); // check body is the middle ware function to check the body
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;