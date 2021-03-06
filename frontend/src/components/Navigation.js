import React, { useState, useEffect, useRef } from 'react'
import { FaBars } from 'react-icons/fa'
import { RiAccountCircleFill } from 'react-icons/ri'
import { IoExit, IoPersonCircle } from 'react-icons/io5'
import { IoEXit } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/context'

const Menu = () => {
	const { logout, userInfo } = useGlobalContext()
	return (
		<>
			<li>
				<Link to='/info'>info</Link>
			</li>
			<li>
				{userInfo ? (
					<Link to='/account'>
						<div className='account'>
							{/* <RiAccountCircleFill className='account-logo' /> */}
							<IoPersonCircle className='account-logo' />
							{userInfo.name}
						</div>
					</Link>
				) : (
					<Link to='/login'>login</Link>
				)}
			</li>
			{userInfo && (
				<li>
					<IoExit className='account account-logout' onClick={logout} />
				</li>
			)}
		</>
	)
}

const Navigation = () => {
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
					<Menu />
				</ul>

				<ul className='drop-links' ref={dropMenuRef} onClick={toggleMenu}>
					{/* {drops.map((drop) => {
						const { id, url, text } = drop
						return (
							<li key={id}>
								<Link to={url}>{text}</Link>
							</li>
						)
					})} */}
				</ul>
			</div>
		</nav>
	)
}

export default Navigation
