const { body, validationResult } = require('express-validator');
  
module.exports = (req, res, next) => {
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('text')
        .not().isEmpty()
        .trim()
        .escape(),
    next();
}
