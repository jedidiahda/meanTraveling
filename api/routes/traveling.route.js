const express = require('express');
const travelingController = require('../controllers/traveling.controller');
const authController = require('../controllers/authentication.controller');

const router = express.Router();

router.get('/travelings', travelingController.getAll);
router.get('/travelings/totalDocs',travelingController.getTotalDocs);
router.get('/travelings/:travelingId', travelingController.getOne);

router.post('/travelings',authController.checkAuthorization, travelingController.createOne);

router.put('/travelings/:travelingId',authController.checkAuthorization, travelingController.updateOne);
router.patch('/travelings/:travelingId',authController.checkAuthorization, travelingController.partialUpdateOne);

router.delete('/travelings/:travelingId',authController.checkAuthorization, travelingController.deleteOne);

module.exports = router;