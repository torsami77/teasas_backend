import express from 'express';
import { AuthControllers } from '../../controllers';
import middleware from '../../middlewares';

const { Authenticate, validate } = middleware;

const {
  signUpUser, signInUser
} = AuthControllers;

const router = express.Router();

router.post('/sign_up', validate('signUp'), signUpUser);
router.post('/sign_in', validate('signIn'), signInUser);

export default router;