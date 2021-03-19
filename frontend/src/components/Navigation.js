import React, { useState, useEffect, useRef } from 'react'
import { FaBars } from 'react-icons/fa'
import {
	IoLogOut,
	IoPersonCircle,
	IoInformationCircle,
	IoLogIn,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/context'

const Menu = ({ iconsOnly }) => {
	const { logout, userInfo } = useGlobalContext()
	return (
		<>
			<li>
				<Link to='/info'>
					{iconsOnly ? <IoInformationCircle className='icon' /> : 'info'}
				</Link>
			</li>

			{userInfo ? (
				<li>
					{iconsOnly ? (
						<Link to='/account'>
							<IoPersonCircle className='icon' />
						</Link>
					) : (
						<Link to='/account'>{userInfo.name}</Link>
					)}
				</li>
			) : (
				<li>
					{iconsOnly ? (
						<Link to='/login'>
							<IoLogIn className='icon' />
						</Link>
					) : (
						<Link to='/login'>login</Link>
					)}
				</li>
			)}

			{userInfo && (
				<li onClick={logout}>
					{iconsOnly ? <IoLogOut className='icon' /> : 'logout'}
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
					<h1>
						<Link to='/'>SearchOn</Link>
					</h1>
				</div>

				<div className='nav-toggle' onClick={toggleMenu}>
					<FaBars />
				</div>

				<ul className='nav-links'>
					<Menu iconsOnly={true} />
				</ul>

				<ul className='drop-links' ref={dropMenuRef} onClick={toggleMenu}>
					<Menu iconsOnly={true} />
				</ul>
			</div>
		</nav>
	)
}

export default Navigation
