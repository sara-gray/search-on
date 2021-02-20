import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/context'

import Wordsearch from '../components/Wordsearch'
import Words from '../components/Words'
import Celebrate from '../components/Celebrate'
import Loading from '../components/Loading'

const Play = ({ location }) => {
	const {
		loading,
		game,
		generateWordsearch,
		gameStart,
		gameReset,
	} = useGlobalContext()

	const [playGame, setPlayGame] = useState(null)

	useEffect(() => {
		const pages = location.pathname.split('/')
		const gameId = pages[pages.length - 1]

		generateWordsearch(gameId)
		gameStart()
		setPlayGame(game)
		return () => {
			gameReset()
		}
	}, [])

	if (loading) return <Loading />
	return (
		<>
			<Celebrate />
			{playGame && (
				<section className='section'>
					<div className='play'>
						<Wordsearch />
						<Words />
					</div>
				</section>
			)}
		</>
	)
}

export default Play
