import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from 'react-icons/io5'
import { useGlobalContext } from '../context/context'
import Loading from '../components/Loading'

const Home = ({ history }) => {
	const {
		loading,
		userInfo,
		publicGrids,
		fetchPublicGrids,
	} = useGlobalContext()

	const [publicGames, setPublicGames] = useState([])
	const [userGames, setUserGames] = useState([])
	const MAX_HERO_IMAGES = 6
	const randomImage =
		Math.floor(Math.random() * Math.floor(MAX_HERO_IMAGES)) + 1

	const [games, setGames] = useState([])

	useEffect(() => {
		fetchPublicGrids()
	}, [])

	useEffect(() => {
		// setPublicGames(publicGrids)
		if (publicGrids) console.log(publicGrids)
	}, [publicGrids])

	useEffect(() => {
		console.log('Get the info about this users wordsearches')
	}, [userInfo])

	const getIdFromTarget = (target) => {
		if (target.tagName === 'DIV') {
			return target.id
		} else {
			return target.parentNode.id
		}
	}

	const selectPublicGame = (e) => {
		const id = getIdFromTarget(e.target)
		history.push(`/play/${id}`)
	}

	const editUserGame = (e) => {
		const id = getIdFromTarget(e.target)
		history.push(`/edit/${id}`)
	}

	if (loading) return <Loading />

	return (
		<section className={`hero hero-image${randomImage}`}>
			<div className='home-center section'>
				{/* Information section */}
				{!userInfo && (
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
				)}

				{/* Public games section */}
				{publicGrids && (
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
							{publicGrids.map((nextGame) => {
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
				)}

				{/* User games section */}
				{userGames.length !== 0 && (
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
							{userGames.map((nextGame) => {
								const { id, title, desc, size } = nextGame
								return (
									<div key={id} className='card' onClick={editUserGame}>
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
				)}
			</div>
		</section>
	)
}

export default Home
