import React from 'react'
import { notify } from '../components/notify'
import { useGlobalContext } from '../context/context'

const Row = ({ row, rowIndex }) => {
	const HORIZONTAL = 'HORIZONTAL'
	const VERTICAL = 'VERTICAL'
	const DIAGONAL = 'DIAGONAL'

	const {
		game: { words },
		guess,
		guessId,
		wordsAvailable,
		wordsGuessed,
		direction,
		addToGuess,
		foundWord,
		gameOver,
		clearClickHistory,
		addToClickHistory,
		setDirection,
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
				return { search: guess, matched: guessReversed, matches: [...matches] }
			} else return null
		}
	}

	const checkValidClick = (id) => {
		if (guess.length === 0) return true
		let clickRow, clickColumn
		if (id.length === 1) {
			clickRow = 0
			clickColumn = Number(id[0])
		} else {
			clickRow = Number(id[0])
			clickColumn = Number(id[1])
		}

		let lastRow, lastColumn, lastId
		lastId = guessId[guessId.length - 1]
		if (lastId.length === 1) {
			lastRow = 0
			lastColumn = Number(lastId[0])
		} else {
			lastRow = Number(lastId[0])
			lastColumn = Number(lastId[1])
		}

		let rowDiff = Math.abs(lastRow - clickRow)
		let columnDiff = Math.abs(lastColumn - clickColumn)

		if (rowDiff > 1 || columnDiff > 1) return false

		let currentDirection = direction
		if (currentDirection === '') {
			if (rowDiff === 1) currentDirection = VERTICAL
			if (columnDiff === 1) currentDirection = HORIZONTAL
			if (rowDiff === 1 && columnDiff === 1) currentDirection = DIAGONAL
			setDirection(currentDirection)
		} else {
			if (rowDiff === 1 && currentDirection === HORIZONTAL) return false
			if (columnDiff === 1 && currentDirection === VERTICAL) return false
			if (rowDiff === 1 && columnDiff === 1 && currentDirection !== DIAGONAL)
				return false
		}
		return true
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
			if (checkValidClick(id) && searching !== null) {
				// This guess is part of a valid word from the words available and the click is next to the previous one in the correct direction
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
						gameOver()
					} else {
						clearClickHistory()
					}
				}
			} else {
				notify('Not a valid letter', 'WARN', { autoClose: 3000 })
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
