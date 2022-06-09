const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');//js inplied for require
router.use(require('./zookeeperRoutes'));

router.use(animalRoutes);


module.exports = router;