import asyncHandler from 'express-async-handler'
import Grid from '../models/gridModel.js'

// @desc    Create new grid
// @route   POST /api/grids
// @access  Private
const addGrid = asyncHandler(async (req, res) => {
	const { title, desc, words, size, language, isPublic } = req.body

	if (words && words.length === 0) {
		res.status(400)
		throw new Error('No grid items')
		return
	} else {
		const grid = new Grid({
			user: req.user._id,
			title,
			desc,
			words,
			size,
			language,
			isPublic,
		})

		const createdGrid = await grid.save()

		res.status(201).json(createdGrid)
	}
})

// @desc    Get Grid by ID
// @route   GET /api/grids/:id
// @access  Public
const getGridDetails = asyncHandler(async (req, res) => {
	const grid = await Grid.findById(req.params.id)

	if (grid) {
		res.json(grid)
	} else {
		res.status(404)
		throw new Error('Grid not found')
	}
})

// @desc    Get all public grids
// @route   GET /api/grids
// @access  Public
const getPublicGrids = asyncHandler(async (req, res) => {
	const grids = await Grid.find({ isPublic: true })
	// change this to return an array of ids
	if (grids) {
		res.json(grids)
	}
	res.send('No public grids available')
})

// @desc    Update Grid to public
// @route   PUT /api/grids/:id/public
// @access  Private
const updateGridToPublic = asyncHandler(async (req, res) => {
	const grid = await Grid.findById(req.params.id)

	if (grid) {
		grid.isPublic = true

		const updatedGrid = await grid.save()
		res.json(updatedGrid)
	} else {
		res.status(404)
		throw new Error('Grid not found')
	}
})

export { addGrid, getGridDetails, getPublicGrids, updateGridToPublic }
