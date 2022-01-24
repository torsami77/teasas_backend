/* eslint-disable camelcase */
import models from '../models';
import {
  status, messages, hashPassword, successResponse, errorResponse, 
  conflictResponse, Jwt, bcrypt
} from '../utils/index';

/**
 * @class AuthControllers
 * @description Controllers for Users
 * @exports AuthControllers
 */
export default class AuthControllers {
  /**
   * @method signUpUser
   * @description Method for learners registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async signUpUser(req, res) {
    try {
      const { email } = req.body;
      const userExits = await models.users.findOne({ where: { email } });
      if (userExits) {
        return conflictResponse(res, status.conflict, false, messages.signUp.conflict);
      }
      req.body.password = await hashPassword(req.body.password);
      const user = await models.users.create(req.body);
      const response = user.toJSON();
      delete response.password;
      // eslint-disable-next-line camelcase
      const { id, childName, grade } = user;
      const token = await Jwt.generateToken({ id, childName, email, grade });
      return successResponse(res, status.created, true, messages.signUp.success, response, token);
    } catch (error) {
      return errorResponse(res, status.error, false, messages.signUp.error);
    }
  }

  /**
   * @method signInUser
   * @description Method for learners sign in
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async signInUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await models.users.findOne({ where: { email } });
      if (!user) {
        return errorResponse(res, status.unauthorized, messages.signIn.invalid);
      }
      const isPasswordValid = await bcrypt.comparePassword(user.password, password);

      if (!isPasswordValid) {
        return errorResponse(res, status.unauthorized, messages.signIn.invalid);
      }
      const {
        id, childName, grade
      } = user;
      const response = {
        id, childName, email, grade
      };
      const token = await Jwt.generateToken({ id, childName, email, grade });
      return successResponse(res, status.success, true, messages.signIn.success, response, token);
    } catch (error) {
      return errorResponse(res, status.error, false, messages.signIn.error);
    }
  }
}