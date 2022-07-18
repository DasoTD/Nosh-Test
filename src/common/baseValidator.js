const { validationResult } = require('express-validator');

class BaseValidator {
  static validate(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();


    return res.json(
      errors.array()[0].msg,
    ) ;
  }
}

module.exports = BaseValidator;
