import express from 'express';
import stripeController from '../Controllers/stripeController.js';

const router = express.Router();

router.post('/', stripeController.stripe);

export default router;