import React from 'react'
import { useGlobalContext } from '../context/context'
import spinner from '../assets/loading.gif'

const Loading = () => {
	const { loading } = useGlobalContext()

	if (!loading) return
	return (
		<div className='loading'>
			<h3>Loading...</h3>
			<img src={spinner} alt='' />
		</div>
	)
}

export default Loading
