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
		resetGame,
	} = useGlobalContext()

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
				if (found.length > 0) {
					correctGuess()
					if (numberGuessed === words.length) {
						console.log('You are amazing!')
						resetGame()
					}
					// yes, change highlight to 'found' class
					// strike through word
				} else {
					e.target.classList.toggle('selected')
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
