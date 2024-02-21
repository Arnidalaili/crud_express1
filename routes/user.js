const router = require('express').Router();
var userController = require('../controllers/userController.js');

  router.get('/', userController.index);
  router.get('/create', userController.create);
  router.post('/create', userController.createUser);
  router.get('/:id/edit', userController.edit);
  router.post('/:id/edit', userController.editUser);
  router.get('/delete/:id', userController.hapusUser);
  router.get('*', userController.notFound);

module.exports = router;