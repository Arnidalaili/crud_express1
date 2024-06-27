const router = require('express').Router();
var loginController = require('../controllers/loginController.js');

  router.get('/', loginController.index);
//   router.get('/create', loginController.create);
//   router.post('/create', loginController.createLogin);
//   router.get('/:id/edit', loginController.edit);
//   router.post('/:id/edit', loginController.editLogin);
//   router.get('/delete/:id', loginController.hapusLogin);
  router.get('*', loginController.notFound);

module.exports = router;