const express = require('express');
const transportationsController = require('../controllers/transportations.controller');
const authController = require('../controllers/authentication.controller');

const router = express.Router();

router.get('/travelings/:travelingId/transportations/totalDocs',transportationsController.getTotalDocs);
router.get('/travelings/:travelingId/transportations', transportationsController.getAll);
router.get('/travelings/:travelingId/transportations/:transportationId',authController.checkAuthorization, transportationsController.getOne);

router.post('/travelings/:travelingId/transportations', transportationsController.createOne);
router.put('/travelings/:travelingId/transportations/:transportationId',authController.checkAuthorization, transportationsController.updateOne);

router.delete('/travelings/:travelingId/transportations/:transportationId',authController.checkAuthorization, transportationsController.deleteOne);

module.exports = router;