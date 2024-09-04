const express = require('express');
const router = express.Router()
const vehicleController = require('../controllers/vehicleController')


// vehicle routes
router.get('/',vehicleController.homepage);
router.get('/about',vehicleController.about);
router.get('/add',vehicleController.addVehicle);
router.post('/add',vehicleController.postVehicle);
router.get('/view/:id',vehicleController.view);

router.get('/edit/:id',vehicleController.edit);
router.put('/edit/:id',vehicleController.editPost);
router.delete('/edit/:id',vehicleController.deleteVehicle);

router.post('/search',vehicleController.searchVehicle);






module.exports = router