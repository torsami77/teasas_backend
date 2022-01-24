import { body, param } from 'express-validator';
import validatePhoneNumber from 'validate-phone-number-node-js';

// add validation rules here.

/* regex description
the regex /^[A-Za-z\-']{2,250}$/
is made up of a single character set, between
[], with a quantifier {2,250}
A-Za-z => matches upper and lowercase alphabets
\-' => matches a - and a '
the last {2,250} is a quantifier specifying that the character been matched
should be > 1 and <= 250
the ^ and $ runs the match from the beginning and end of the string
*/
const nameRegex = /^[A-Za-z\-']{2,20}$/;

const checkEmail = (input, message) => body(input)
  .not()
  .isEmpty()
  .isEmail()
  .withMessage(message);

export const validateEmail = [
  checkEmail('email', 'Please provide a valid email')
];

export const signUp = [
  body('childName', '"childName": should be alphabets between 2 and 20 characters')
    .matches(nameRegex)
    .trim(),
  body('email', '"email": Please provide a valid email')
    .isEmail()
    .not()
    .isEmpty(),
  body('phoneNumber')
    .custom((value) => {
        if (validatePhoneNumber.validate(value) !== true) {
          throw new Error('"phoneNumber": Invalid mobile number');
        }
        return true;
      }),
  body('countryCode', '"countryCode": please provide a valid country code')
    .trim()
    .isNumeric()
    .withMessage('Country code must be numeric.')
    .bail()
    .isLength({ min: 1, max: 4 })
    .withMessage('Invalid country code.')
    .bail(),
  body('password', 'password should be at least 6 characters')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
  body('grade', `"grade": Must be one of 'grade1', 'grade2', 'grade3', 'grade4', 
  'grade5', 'grade6', 'grade7', 'grade8', 'grade9', 'grade10', 'grade11', 'grade12'`).isIn(['grade1', 'grade2', 'grade3', 'grade4', 
  'grade5', 'grade6', 'grade7', 'grade8', 'grade9', 'grade10', 'grade11', 'grade12']),
];

export const updatePassword = [
  body('password', 'password should be at least 6 characters').isLength({ min: 6 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match');
    }
    return true;
  })
];

export const signIn = [
  body('email', 'email is invalid, please provide a valid mail')
    .isEmail()
    .not()
    .isEmpty(),
  body('password', 'password should be at least 6 characters')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
];