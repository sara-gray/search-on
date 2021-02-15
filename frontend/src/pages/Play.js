import React from 'react'
import Wordsearch from '../components/Wordsearch'
import Words from '../components/Words'
import Message from '../components/Message'
import Shuffle from '../components/Shuffle'

const Play = () => {
	return (
		<section className='section'>
			<div className='play'>
				<Wordsearch />
				<Words />
				<Message />
				<Shuffle />
			</div>
		</section>
	)
}

export default Play
