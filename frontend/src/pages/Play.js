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

	if (loading) return <Loading />
	return (
		<>
			<Celebrate />
			{playGame && (
				<section className='section'>
					<div className='play'>
						<Wordsearch />
						<Words />{' '}
					</div>
				</section>
			)}
		</>
	)
}

export default Play
