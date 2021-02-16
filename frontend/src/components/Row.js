import React from 'react'
import { useGlobalContext } from '../context/context'

const Row = ({ row, rowIndex }) => {
	const {
		words,
		guess,
		numberGuessed,
		setMessage,
		addToGuess,
		correctGuess,
		gameReset,
	} = useGlobalContext()

	const switchClass = (from, to) => {
		const grid = document.getElementsByClassName(`letter ${from}`)
		let gridIds = []
		for (let i = 0; i < grid.length; i++) {
			gridIds = [...gridIds, grid[i].id]
		}

		gridIds.forEach((id) => {
			const letter = document.getElementById(id)
			if (letter != null) {
				letter.classList.toggle(from)
				if (to !== '') letter.classList.toggle(to)
			}
		})
	}

	const handleClick = (e) => {
		const highlighted = e.target.classList.contains('selected')
		const letter = e.target.innerHTML

		if (!highlighted) {
			// Check next to another highlighted letter
			// Assume yes!

			let guessing = guess + letter
			const possibleMatches = words.filter((word) =>
				word.includes(guessing.toLowerCase(guessing))
			)
			// What if you have words in words in your word bank? Need to cater for spaces in words array
			if (possibleMatches.length !== 0) {
				addToGuess(guessing)
				const found = possibleMatches.filter(
					(item) =>
						item.length == guessing.length &&
						item.toLowerCase() === guessing.toLowerCase()
				)
				e.target.classList.toggle('selected')
				if (found.length > 0) {
					switchClass('selected', 'found')
					if (numberGuessed === words.length - 1) {
						switchClass('found', '')
						gameReset()
					} else {
						correctGuess()
					}
				}
			} else {
				setMessage('Not a valid letter', 'danger')
			}
		} else {
			// Remove from guess
			// Check not in the middle of a guess
			// Assume yes!
			e.target.classList.remove('selected')
		}
	}

	return (
		<div className='row'>
			{row.map((letter, columnIndex) => {
				const id = parseInt(rowIndex.toString() + columnIndex.toString())
				return (
					<div
						key={id}
						id={id}
						className='letter'
						onClick={(e) => handleClick(e)}>
						{letter}
					</div>
				)
			})}
		</div>
	)
}
export default Row
