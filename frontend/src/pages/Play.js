import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/context'

import Wordsearch from '../components/Wordsearch'
import Words from '../components/Words'
import Message from '../components/Message'
import Shuffle from '../components/Shuffle'
import Celebrate from '../components/Celebrate'

const Play = () => {
	const { generateWordsearch, gameReset, message } = useGlobalContext()

	useEffect(() => {
		// Move this into Save Wordsearch
		generateWordsearch()
		gameReset()
	}, [])

	return (
		<>
			<Celebrate />
			<section className='section'>
				<div className='play'>
					<Wordsearch />
					<Words />
					<Shuffle />
					<Message message={message} />
				</div>
			</section>
		</>
	)
}

export default Play
