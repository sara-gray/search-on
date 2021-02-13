import React, { useState } from 'react'
import wordsearch from 'wordsearch-generator'

const Wordsearch = () => {
	const [words, setWords] = useState([
		'ant',
		'monkey',
		'cat',
		'dog',
		'bald eagle',
	])
	let puzzleGrid = wordsearch.createPuzzle(10, 10, 'en', words)
	puzzleGrid = wordsearch.hideWords(puzzleGrid, 'en')
	let lines = wordsearch.printGrid(puzzleGrid)

	return (
		<div>
			<h3>Current wordsearch</h3>
			{lines.map((row, index) => {
				return <p key={index}>{row}</p>
			})}
		</div>
	)
}

export default Wordsearch
