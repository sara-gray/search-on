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
		currentGrid,
		fetchPublicGrids,
		fetchGrid,
		publicGrids,
		generateWordsearch,
		gameStart,
		gameReset,
	} = useGlobalContext()

	const [playGame, setPlayGame] = useState(null)

	useEffect(() => {
		const pages = location.pathname.split('/')
		const id = pages[pages.length - 1]

		if (publicGrids) {
			const found = publicGrids.filter((grid) => grid.id === id)
			if (found) {
				setPlayGame(...found)
			} else {
				console.log('user grid')
				// fetchGrid(id)
			}
			// setPlayGame(newGame)
			// generateWordsearch(newGame)
			// gameStart(newGame)
			return () => {
				gameReset()
			}
		} else {
			fetchPublicGrids()
		}
	}, [publicGrids])

	// useEffect(() => {
	// 	if (!playing && playGame !== null) {
	// 		generateWordsearch(playGame)
	// 		gameStart(playGame)
	// 	}
	// }, [playing])

	useEffect(() => {
		if (playGame !== null) {
			console.log('playGame')
			// generateWordsearch(playGame)
			// gameStart(playGame)
		}
	}, [playGame])

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
