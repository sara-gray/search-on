import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all grids
// @route   GET /api/grids
// @access  Public
const getGrids = asyncHandler(async (req, res) => {
	const grids = await Grid.find({})
	res.json(grids)
})

// @desc    Fetch single grid
// @route   GET /api/grids/:id
// @access  Public
const getGridById = asyncHandler(async (req, res) => {
	const grid = await Grid.findById(req.params.id)

	if (grid) {
		res.json(grid)
	} else {
		res.status(404)
		throw new Error('Grid not found')
	}
})

export { getGrids, getGridById }
