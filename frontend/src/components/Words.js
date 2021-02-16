import React from 'react'
import { useGlobalContext } from '../context/context'

const Words = () => {
	const { words, numberGuessed } = useGlobalContext()
	const leftToGuess = words.length - numberGuessed

	return (
		<ul className='words'>
			<h4>{leftToGuess} words to guess:</h4>
			{words.map((word, index) => {
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
