const AlertController = require('../controllers/AlertController');
const express = require('express');
const router = express.Router();
router.get('/', AlertController.index);
router.get('/:id', AlertController.show);
router.post('/', AlertController.create);
router.put('/:id', AlertController.update);
router.delete('/:id', AlertController.destroy);
module.exports = router;