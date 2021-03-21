import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline, IoAddCircleOutline } from 'react-icons/io5'
import { useGlobalContext } from '../context/context'
import Loading from '../components/Loading'
import { FaPlay, FaEdit } from 'react-icons/fa'

const Home = ({ history }) => {
	const {
		loading,
		userInfo,
		publicGrids,
		userGrids,
		fetchPublicGrids,
		fetchUserGrids,
	} = useGlobalContext()

	const MAX_HERO_IMAGES = 6
	const randomImage =
		Math.floor(Math.random() * Math.floor(MAX_HERO_IMAGES)) + 1

	useEffect(() => {
		fetchPublicGrids()
	}, [])

	useEffect(() => {
		if (userInfo) fetchUserGrids(userInfo)
	}, [userInfo])

	const playGame = (e) => {
		const id = e.target.closest('div').id
		history.push(`/play/${id}`)
	}

	const editGame = (e) => {
		const id = e.target.closest('div').id
		history.push(`/edit/${id}`)
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
					{!userInfo && (
						<>
							<button className='btn primary'>
								<Link to='/login'>Login</Link>
							</button>
							<button className='btn'>
								<Link to='/register'>Register</Link>
							</button>
						</>
					)}
				</article>

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
								const { _id, title, desc, size } = nextGame
								return (
									<div key={_id} className='card' onClick={playGame}>
										<div className='inner-card' id={_id}>
											<h4>{title}</h4>
											<p style={{ fontSize: '0.8rem' }}>{desc}</p>
											Grid size: {size.x} x {size.y}
											<br />
											<FaPlay />
										</div>
									</div>
								)
							})}
						</div>
					</article>
				)}
				{/* User games section */}
				{userGrids && (
					<article className='games user-games'>
						<div className='search-title'>
							<h4>your games</h4>
							<div
								className='search'
								onClick={() => {
									console.log('searching?')
								}}>
								<IoAddCircleOutline
									onClick={() => {
										history.push(`/edit`)
									}}
								/>
								<IoSearchOutline />
								<input type='text'></input>
							</div>
						</div>
						<div className='game-cards'>
							{userGrids.map((nextGame) => {
								const { _id, title, desc, size } = nextGame
								return (
									<div key={_id} className='card'>
										<div className='inner-card'>
											<h4>{title}</h4>
											<p style={{ fontSize: '0.8rem' }}>{desc}</p>
											Grid size: {size.x} x {size.y}
											<br />
											<div className='user-grid-icons' id={_id}>
												<FaPlay onClick={playGame} />
												<FaEdit onClick={editGame} />
											</div>
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
