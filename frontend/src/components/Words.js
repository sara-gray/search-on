import React from 'react'
import { useGlobalContext } from '../context/context'

const Words = () => {
	const {
		game: { words },
		wordsAvailable,
		wordsGuessed,
	} = useGlobalContext()

	return (
		<ul className='words'>
			<h4>{wordsAvailable.length} words to guess:</h4>
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
