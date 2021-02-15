import React, { useState } from 'react'
import wordsearch from 'wordsearch-generator'
import { useGlobalContext } from '../context/context'
import Row from './Row'

const Wordsearch = () => {
	const { current } = useGlobalContext()
	const { title, words, size, language } = current

	let puzzleGrid = wordsearch.createPuzzle(size.x, size.y, language, words)
	puzzleGrid = wordsearch.hideWords(puzzleGrid, language)
	let lines = wordsearch.printGrid(puzzleGrid)

	return (
		<div className='wordsearch'>
			<h3>{title}</h3>
			<div className='word-grid'>
				{lines.map((row, index) => {
					return <Row key={index} row={row} />
				})}
			</div>
		</div>
	)
}

export default Wordsearch
