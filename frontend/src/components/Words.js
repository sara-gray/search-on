import React from 'react'
import { useGlobalContext } from '../context/context'

const Words = () => {
	const { current } = useGlobalContext()

	return (
		<ul className='words'>
			{current.words.map((word, index) => {
				return (
					<li className='word' key={index}>
						{word}
					</li>
				)
			})}
		</ul>
	)
}

export default Words
