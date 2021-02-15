import React, { useState, useEffect } from 'react'

const Home = () => {
	const MAX_HERO_IMAGES = 6
	const randomImage =
		Math.floor(Math.random() * Math.floor(MAX_HERO_IMAGES)) + 1

	return (
		<section className={`hero hero-images${randomImage}`}>
			<div className='hero-center'>
				<article className='hero-info'>
					<h2>Play and create Wordsearches online</h2>
					<p>
						<strong>Education</strong>: Create and distribute wordsearches to
						you students
					</p>
					<button className='btn primary'>Login</button>
				</article>
				<article>2</article>
			</div>
			{/* <div className='hero-center'>
				<article className='hero-info'>
					<h2>Play and create Wordsearches online</h2>
				
					
					<button className='btn'>Register</button>
				</article>
			</div> */}
		</section>
	)
}

export default Home
