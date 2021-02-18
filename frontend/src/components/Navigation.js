import React, { useState, useEffect, useRef } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navigation = () => {
	const links = [
		{ id: 1, url: '/info', text: 'info' },
		{ id: 2, url: '/login', text: 'login' },
	]
	const drops = [
		{ id: 1, url: '/info', text: 'info' },
		{ id: 2, url: '/login', text: 'login' },
	]
	const [showLinks, setShowLinks] = useState(false)
	const dropMenuRef = useRef(null)

	const toggleMenu = () => {
		setShowLinks(!showLinks)
	}

	useEffect(() => {
		if (showLinks) {
			dropMenuRef.current.style.display = 'inline'
		} else {
			dropMenuRef.current.style.display = 'none'
		}
	}, [showLinks])

	return (
		<nav>
			<div className='nav-container section'>
				<div className='logo'>
					<h2>
						<Link to='/'>SearchOn</Link>
					</h2>
				</div>
				<div className='nav-toggle' onClick={toggleMenu}>
					<FaBars />
				</div>
				<ul className='nav-links'>
					{links.map((link) => {
						const { id, url, text } = link
						return (
							<li key={id}>
								<Link to={url}>{text}</Link>
							</li>
						)
					})}
				</ul>

				<ul className='drop-links' ref={dropMenuRef} onClick={toggleMenu}>
					{drops.map((drop) => {
						const { id, url, text } = drop
						return (
							<li key={id}>
								<Link to={url}>{text}</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</nav>
	)
}

export default Navigation
