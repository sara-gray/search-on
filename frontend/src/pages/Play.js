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
		generateWordsearch,
		gameStart,
		gameReset,
		fetchGame,
	} = useGlobalContext()

	const [playGame, setPlayGame] = useState(null)

	useEffect(() => {
		const pages = location.pathname.split('/')
		const gameId = pages[pages.length - 1]
		const newGame = fetchGame(gameId)
		setPlayGame(newGame)
		generateWordsearch(newGame)
		gameStart(newGame)
		return () => {
			gameReset()
		}
	}, [])

	useEffect(() => {
		if (!playing && playGame !== null) {
			generateWordsearch(playGame)
			gameStart(playGame)
		}
	}, [playing])

	if (loading) return <Loading />
	return (
		<>
			<Celebrate />
			{playing && (
				<section className='section'>
					<div className='play'>
						<Wordsearch />
						<Words />
						<Restart />
						<CopyLink />
					</div>
				</section>
			)}
		</>
	)
}

export default Play
