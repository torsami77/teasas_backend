/* eslint-disable camelcase */
import models from '../models';
import {
  status, messages, hashPassword, generateToken,
  successResponse, errorResponse, conflictResponse, Jwt, bcrypt, getCallbackUrls
} from '../utils/index';


/**
 * @class LessonControllers
 * @description Controllers for Lessons
 * @exports LessonControllers
 */
export default class LessonControllers {
  /**
   * @method getAllLessons
   * @description Method for updating password
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async getAllLessons(req, res) {
    const { id, grade } = req.user;
    try {
      // eslint-disable-next-line max-len
      const response = await models.lessons.findAll({ where: { grade } });
      if (!response) {
      } else {
        return successResponse( res, status.success, true, messages.lessons.getAllSuccessfully, response );
      }
    } catch (error) {
      errorResponse(res, 500, 'get lessons error');
    }
  }
}
