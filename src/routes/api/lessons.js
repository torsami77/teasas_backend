import express from 'express';
import { LessonControllers } from '../../controllers';
import middleware from '../../middlewares';

const { Authenticate, validate } = middleware;

const {
  getAllLessons
} = LessonControllers;

const router = express.Router();

router.get('/get_all_lessons', Authenticate.verifyToken, getAllLessons);

export default router;