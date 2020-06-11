const {Router} = require ('express');
const router = Router();
const userController = require('../controllers/userController'); // imported from userController.js

router.get('/', userController.getIndex);

router.get('/signup', userController.getSignUp);

router.post('/signup', userController.postSignUp);

router.get('/login', userController.getLogIn);

router.post('/login', userController.postLogin);

router.get('/profile', userController.getProfile);

module.exports = router;