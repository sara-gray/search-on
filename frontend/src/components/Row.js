import React from 'react'
import { useGlobalContext } from '../context/context'

const Row = ({ row, rowIndex }) => {
	const {
		words,
		guess,
		wordsAvailable,
		wordsGuessed,
		setMessage,
		addToGuess,
		foundWord,
		gameReset,
		clearClickHistory,
		addToClickHistory,
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

	const searchForWord = (guess) => {
		if (guess === null || guess === '' || guess === undefined) return null

		let matches = wordsAvailable.filter((word) => word.includes(guess))
		if (matches.length !== 0) {
			return { search: guess, matched: guess, matches: [...matches] }
		} else {
			let guessReversed = guess.split('').reverse().join('')
			matches = wordsAvailable.filter((word) => word.includes(guessReversed))
			if (matches.length !== 0) {
				return { search: guessReversed, matched: guess, matches: [...matches] }
			} else return null
		}
	}

	const handleClick = (e) => {
		const highlighted = e.target.classList.contains('selected')
		const letter = e.target.innerHTML
		const id = e.target.id

		if (highlighted) {
			clearClickHistory()
			switchClass('selected', '')
		} else {
			const searching = searchForWord(guess + letter)
			if (searching !== null) {
				// This guess is part of a valid word from the word available
				const { search, matched, matches } = searching
				addToGuess(search)
				addToClickHistory(id)

				const foundIndex = matches.indexOf(matched)

				e.target.classList.toggle('selected')
				if (foundIndex !== -1) {
					// Found complete word
					switchClass('selected', 'found')
					foundWord(matches[foundIndex])
					if (wordsGuessed.length === words.length - 1) {
						// Found them all!
						switchClass('found', '')
						gameReset('Well done, you have found them all!')
					} else {
						clearClickHistory()
					}
				}
			} else {
				setMessage('Not a valid letter', 'danger')
				clearClickHistory()
				switchClass('selected', '')
			}
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
