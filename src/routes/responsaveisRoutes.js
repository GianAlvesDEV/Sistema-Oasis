const express = require('express');
const router = express.Router();
const controller = require('../controller/responsaveisController');

router.get('/', controller.findAll);

router.get('/:nome', controller.findByName);

router.post('/', controller.create);

router.put('/:id', controller.alter);

router.delete('/:id', controller.remove);

module.exports = router;