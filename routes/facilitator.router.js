import express from 'express';
import { addFacilitator, getNearestFacilitator } from '../controllers/facilitator.controller.js';

const router = express.Router();

router.get('', getNearestFacilitator);
router.post('', addFacilitator);

export default router;