import express from 'express'
const router = express.Router()
import {
	addGrid,
	getGridDetails,
	getPublicGrids,
	getUserGrids,
	updateGridToPublic,
} from '../controllers/gridController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getPublicGrids)
router.route('/user').get(protect, getUserGrids)
router.route('/:id').get(getGridDetails)
router.route('/').post(protect, addGrid)
router.route('/:id/public').put(protect, updateGridToPublic)

export default router
