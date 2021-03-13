import express from 'express'
const router = express.Router()
import {
	addGrid,
	getGridDetails,
	getPublicGrids,
	updateGridToPublic,
} from '../controllers/gridController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addGrid)
router.route('/').get(getPublicGrids)
router.route('/:id').get(protect, getGridDetails)
router.route('/:id/public').put(protect, updateGridToPublic)

export default router
