const express = require('express');
const tourController = require('../Controller/tourController');

// const tourRouter = express.Router();
const Router = express.Router();
Router.param('id',tourController.checkID);   // middleware that check id is persent or not

Router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.createTour);

Router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = Router;