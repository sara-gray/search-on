import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
	const MAX_HERO_IMAGES = 6
	const randomImage =
		Math.floor(Math.random() * Math.floor(MAX_HERO_IMAGES)) + 1

	return (
		<section className={`hero hero-image${randomImage}`}>
			<div className='hero-center section'>
				<article className='hero-info '>
					<h2>Play and create Wordsearches online</h2>
					<p>
						<strong>Education</strong>: Create and distribute wordsearches to
						you students
					</p>
					<button className='btn primary'>
						<Link to='/login'>Login</Link>
					</button>
					<button className='btn'>
						<Link to='/login'>Register</Link>
					</button>
				</article>
				<article className='hero-cards'>
					<div className='card '>1</div>
					<div className='card '>2</div>
					<div className='card '>3</div>
					<div className='card'>4</div>
					<div className='card'>5</div>
				</article>
			</div>
		</section>
	)
}

export default Home
