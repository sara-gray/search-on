import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from 'react-icons/io5'
import { useGlobalContext } from '../context/context'
import Loading from '../components/Loading'

const Home = ({ history }) => {
	const {
		loading,
		publicIds,
		fetchPublicGames,
		fetchGame,
		setUserInfo,
		userInfo,
	} = useGlobalContext()

	const [publicGames, setPublicGames] = useState([
		{
			id: 1,
			title: 'Random animals',
			desc: 'Find the animals',
			size: { x: 20, y: 20 },
		},
		{
			id: 2,
			title: 'Family',
			desc: 'Locate all your family members',
			size: { x: 10, y: 10 },
		},
		{
			id: 3,
			title: 'science',
			desc: 'Types of bonding',
			size: { x: 20, y: 20 },
		},
		{
			id: 4,
			title: 'Test',
			desc: 'just for testing',
			size: { x: 5, y: 5 },
		},
	])

	const MAX_HERO_IMAGES = 6
	const randomImage =
		Math.floor(Math.random() * Math.floor(MAX_HERO_IMAGES)) + 1

	const [games, setGames] = useState([])

	useEffect(() => {
		// fetchPublicGames()
		// Should this be in App.js?
		// setUserInfo(
		// 	localStorage.getItem('userInfo')
		// 		? JSON.parse(localStorage.getItem('userInfo'))
		// 		: null
		// )
		// console.log(userInfo)
	}, [])

	useEffect(() => {
		// let newGames = []
		// publicIds.map((id) => {
		// 	newGames.push(fetchGame(id))
		// })
		// if (newGames.length !== 0) setGames(newGames)
	}, [publicIds])

	const selectPublicGame = (e) => {
		let id
		if (e.target.tagName === 'DIV') {
			id = e.target.id
		} else {
			id = e.target.parentNode.id
		}
		history.push(`/play/${id}`)
	}

	if (loading) return <Loading />

	return (
		<section className={`hero hero-image${randomImage}`}>
			<div className='home-center section'>
				{/* Information section */}
				<article className='home-info '>
					<h2>Play and create Wordsearches online</h2>
					<p>
						<strong>Education</strong>: Create and distribute wordsearches to
						your students
					</p>
					<p>
						<strong>Gaming</strong>: Just enjoy creating and playing your own
						wordsearches. Share them with friends and family!
					</p>
					<button className='btn primary'>
						<Link to='/login'>Login</Link>
					</button>
					<button className='btn'>
						<Link to='/register'>Register</Link>
					</button>
				</article>

				{/* Public games section */}
				<article className='games public-games'>
					<div className='search-title'>
						<h4>play now</h4>
						<div
							className='search'
							onClick={() => {
								console.log('searching?')
							}}>
							<IoSearchOutline />
							<input type='text'></input>
						</div>
					</div>
					<div className='game-cards'>
						{publicGames.length !== 0 &&
							publicGames.map((nextGame) => {
								const { id, title, desc, size } = nextGame
								return (
									<div key={id} className='card' onClick={selectPublicGame}>
										<div className='inner-card' id={id}>
											<h4>{title}</h4>
											<p style={{ fontSize: '0.8rem' }}>{desc}</p>
											Grid size: {size.x} x {size.y}
										</div>
									</div>
								)
							})}
					</div>
				</article>

				{/* User games section */}
				<article className='games user-games'>
					<div className='search-title'>
						<h4>your games</h4>
						<div
							className='search'
							onClick={() => {
								console.log('searching?')
							}}>
							<IoSearchOutline />
							<input type='text'></input>
						</div>
					</div>
					<div className='game-cards'>
						{publicGames.length !== 0 &&
							publicGames.map((nextGame) => {
								const { id, title, desc, size } = nextGame
								return (
									<div key={id} className='card' onClick={selectPublicGame}>
										<div className='inner-card' id={id}>
											<h4>{title}</h4>
											<p style={{ fontSize: '0.8rem' }}>{desc}</p>
											Grid size: {size.x} x {size.y}
										</div>
									</div>
								)
							})}
					</div>
				</article>
			</div>
		</section>
	)
}

export default Home
