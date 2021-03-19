import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/context'

import Wordsearch from '../components/Wordsearch'
import Words from '../components/Words'
import Celebrate from '../components/Celebrate'
import Loading from '../components/Loading'
import Restart from '../components/Restart'
import CopyLink from '../components/CopyLink'

const Play = ({ location }) => {
	const {
		loading,
		playing,
		fetchGrid,
		currentGrid,
		generateWordsearch,
		gameStart,
		gameReset,
	} = useGlobalContext()

	useEffect(() => {
		const pages = location.pathname.split('/')
		const id = pages[pages.length - 1]

		fetchGrid(id)
		// gameStart(newGame)

		return () => {
			console.log('no game')
			// gameReset()
		}
	}, [])

	useEffect(() => {
		if (currentGrid) {
			console.log('play game')
		} else {
			console.log('no game')
			// resetGame()
		}
		// generateWordsearch(currentGrid)
		// if (!playing && playGame !== null) {
		// 	generateWordsearch(playGame)
		// 	gameStart(playGame)
		// }
	}, [currentGrid])

	if (loading) return <Loading />
	return (
		<>
			<Celebrate />
			{playing && (
				<section className='section'>
					<div className='play'>
						{/* <Wordsearch />
						<Words />
						<Restart />
						<CopyLink /> */}
					</div>
				</section>
			)}
		</>
	)
}

export default Play
