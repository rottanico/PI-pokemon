const { Router } = require('express');

const controlerPokemon = require('./Class/pokemon')
const router = Router();
router.get('/Order/:order',controlerPokemon.getOrder)
router.get('/Db',controlerPokemon.getDb)
router.get('/Api',controlerPokemon.getApis)
router.get('/All',controlerPokemon.getAll)
router.post('/',controlerPokemon.postPokemon)


router.get('/:id',controlerPokemon.getById)


router.get('/',controlerPokemon.getByName)
module.exports = router