const router = require('express').Router();
const {verifyUser} = require('../../middlewares')
const {
  signUp,
  login,
  signOut
} = require('./auth.controller');
const AuthValidator = require('./auth.validator');


router.post(
  '/signup',
  AuthValidator.validateSignUpForm(),
  signUp
);
router.post(
  '/login',
  AuthValidator.validateLoginForm(),
  AuthValidator.validate,
  login
);

router.get(
  '/sign-out', 
  verifyUser, 
  signOut
);


module.exports = router;
