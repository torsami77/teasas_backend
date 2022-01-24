import { Router } from 'express';
import authRoutes from './api/auth';
import lessonsRoutes from './api/lessons';

const router = new Router();
router.use('/auth', authRoutes);
router.use('/lessons', lessonsRoutes);

export default router;