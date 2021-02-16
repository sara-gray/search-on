import React from 'react'
import { useGlobalContext } from '../context/context'

const Shuffle = () => {
	const { setMessage } = useGlobalContext()
	const handleClick = () => {
		setMessage('test')
	}
	return (
		<div className='shuffle'>
			<button className='btn primary' onClick={handleClick}>
				Shuffle
			</button>
		</div>
	)
}

export default Shuffle
