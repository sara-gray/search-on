import mongoose from 'mongoose'

const gridSchema = mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
		title: { type: String, required: true },
		desc: { type: String },
		words: { type: Array, required: true },
		language: { type: String, required: true },
		isPublic: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
)
const Grid = mongoose.model('Grid', gridSchema)
export default Grid
