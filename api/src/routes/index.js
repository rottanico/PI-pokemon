const { Router } = require('express');
const routespokemon = require('./pokemon')
const routestype = require('./type')

const router = Router();
router.use('/pokemon',routespokemon)
router.use('/type',routestype)



module.exports = router;
