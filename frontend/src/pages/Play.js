import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/context'

import Wordsearch from '../components/Wordsearch'
import Words from '../components/Words'
import Message from '../components/Message'
import Shuffle from '../components/Shuffle'

const Play = () => {
	const { generateWordsearch, gameReset } = useGlobalContext()

	useEffect(() => {
		// Move this into Save Wordsearch
		generateWordsearch()
		gameReset("Let's play!")
	}, [])

	return (
		<section className='section'>
			<div className='play'>
				<Wordsearch />
				<Words />
				<Message message={'message'} />
				<Shuffle />
			</div>
		</section>
	)
}

export default Play
