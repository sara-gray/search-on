import React from 'react'
import { useGlobalContext } from '../context/context'

const Words = () => {
	const { words, numberGuessed, wordsGuessed } = useGlobalContext()
	const leftToGuess = words.length - numberGuessed

	return (
		<ul className='words'>
			<h4>{leftToGuess} words to guess:</h4>
			{words.map((word, index) => {
				const found = wordsGuessed.find(
					(item) => item.toLowerCase() === word.toLowerCase()
				)
				let wordClass = 'word'
				if (found) wordClass = 'word found'
				return (
					<li className={wordClass} key={index}>
						{word}
					</li>
				)
			})}
		</ul>
	)
}

export default Words
