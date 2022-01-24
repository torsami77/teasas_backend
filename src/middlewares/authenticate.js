import { verifyToken, errorResponse } from '../utils';
import models from '../models';

const { Sequelize } = models;
/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
class Authenticate {
  /**
   * Verify if token is valid
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyToken(req, res, next) {
    try {
      const { headers: { authorization } } = req;
      const token = authorization.split(' ')[1];
      if (!token || token === '') {
        return errorResponse(res, 401, 'Access denied.');
      }
      const decoded = await verifyToken(token);
      if (!(decoded && decoded.id)) {
        return errorResponse(res, 401, 'Access denied. We could not verify user');
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return errorResponse(res, 500, 'Server error');
    }
  }
  // special privelleges goes here...
}

export default Authenticate;