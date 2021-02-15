import React from 'react'

const Row = ({ row }) => {
	const columns = row.split(' ')
	const handleClick = (e) => {
		e.target.classList.toggle('selected')
	}
	return (
		<div className='row'>
			{columns.map((letter, index) => {
				return (
					<div key={index} className='letter' onClick={(e) => handleClick(e)}>
						{letter}
					</div>
				)
			})}
		</div>
	)
}
export default Row
