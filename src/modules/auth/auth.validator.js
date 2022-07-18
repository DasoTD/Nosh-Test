const { param, body } = require('express-validator');
const { BaseValidator } = require('../../common');
const {isStrongPassword} = require('../../utils');

class UsersValidator extends BaseValidator {
  static validateSignUpForm() {
    return [
      body("firstname")
        .isLength({ min: 2 })
        .withMessage("First name must be minimum of two characters"),
      body("lastname")
        .isLength({ min: 2 })
        .withMessage("Last name must be minimum of two characters"),
      body("email").isEmail().withMessage("Invalid email format"),
      body("phone")
        .isLength({ min: 10 })
        .withMessage("Phone number must be at least 10 digits")
        .isNumeric()
        .withMessage("Phone number must be digits only."),
      body("dob").isString().withMessage("Invalid date format"),
      body("password")
        .isString()
        .withMessage("Provide a valid password")
        .custom((value) => isStrongPassword(value))
        .withMessage("password is not strong enough."),
      body("country").isString().withMessage("Provide a valid country"),
      body("gender").isString().withMessage("Provide a valid gender"),
      body("telephoneCode")
        .isString()
        .withMessage("Provide a valid phone code"),
      body("username").isString().withMessage("Provide a valid username"),
     
    ];
  }

  static validateLoginForm() {
    return [
      body('username')
        .isString()
        .withMessage('Provide a valid username or email'),
      body('password').isString().withMessage('Provide a valid password'),
  
    ];
  }

}

module.exports = UsersValidator;
