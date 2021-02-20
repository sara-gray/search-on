import React from 'react'
import { useGlobalContext } from '../context/context'
import { notify } from '../components/notify'

const Restart = () => {
	const { gameRestart } = useGlobalContext()
	const handleClick = () => {
		notify('Restarting with a shuffle!', 'SUCCESS', { autoClose: 3000 })
		gameRestart()
	}
	return (
		<div className='restart'>
			<button className='btn primary' onClick={handleClick}>
				Restart
			</button>
		</div>
	)
}

export default Restart
