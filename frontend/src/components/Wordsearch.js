import React from 'react'
import { useGlobalContext } from '../context/context'
import Row from './Row'

const Wordsearch = () => {
	const { current } = useGlobalContext()
	const { title } = current

	return (
		<div className='wordsearch'>
			<h3>{title}</h3>
			<div className='word-grid'>
				{/* {.map((row, index) => {
					return <Row key={index} row={row} />
				})} */}
			</div>
		</div>
	)
}

export default Wordsearch
