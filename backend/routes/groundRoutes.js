import express from 'express';
const router = express.Router();
import { createGround , getGroundsByLocation , getGroundsByIdandDate } from '../controllers/groundsController.js';


router.route('/createGround').post(createGround);

router.route('/').get(getGroundsByLocation);

router.route('/:ground_id').get(getGroundsByIdandDate)

export default router;
