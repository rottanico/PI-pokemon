const { Router } = require('express');

const controlerType = require('./Class/type')
const router = Router();

router.get('/',controlerType.saveType)


module.exports = router