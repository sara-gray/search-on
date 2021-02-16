import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/context'

import Wordsearch from '../components/Wordsearch'
import Words from '../components/Words'
import Message from '../components/Message'
import Shuffle from '../components/Shuffle'

const Play = () => {
	const { generateWordsearch } = useGlobalContext()

	useEffect(() => {
		generateWordsearch()
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
