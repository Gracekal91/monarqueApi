const express = require('express');
const router = express.Router();
const servicesControllers = require('../controllers/ServiceControllers');

router.route('/').get(servicesControllers.getServices);
router.route('/create').post(servicesControllers.addService);
router.route('/update').put(servicesControllers.updateService);

module.exports = router;