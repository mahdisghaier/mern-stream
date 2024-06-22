const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');

// Other routes
router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

// Login route
router.post('/login', UserController.login);

module.exports = router;
