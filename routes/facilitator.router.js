import express from 'express';
import { addFacilitator, getAllFacilitator, getNearestFacilitator } from '../controllers/facilitator.controller.js';

const router = express.Router();

router.get('', getAllFacilitator);
router.get('/:state', getNearestFacilitator);
router.post('', addFacilitator);

export default router;