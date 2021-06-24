const { Router } = require('express');

const controlerPokemon = require('./Class/pokemon')
const router = Router();


router.get('/All',controlerPokemon.getAll)
router.post('/',controlerPokemon.postPokemon)


router.get('/:id',controlerPokemon.getById)


router.get('/',controlerPokemon.getByName)
module.exports = router