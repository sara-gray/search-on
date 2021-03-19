import React from 'react'
import { useGlobalContext } from '../context/context'
import Row from './Row'

const Wordsearch = () => {
	const {
		game: { title, puzzleGrid },
	} = useGlobalContext()

	return (
		<div className='wordsearch'>
			<h3>{title}</h3>
			<div className='word-grid'>
				{puzzleGrid.map((row, index) => {
					return <Row key={index} row={row} rowIndex={index} />
				})}
			</div>
		</div>
	)
}

export default Wordsearch
