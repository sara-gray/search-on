import React from 'react'
import { useGlobalContext } from '../context/context'

const Account = () => {
	const { logout, userInfo } = useGlobalContext()
	const { name, email, isAdmin } = userInfo
	return (
		<div className='section account'>
			<h3>Account Details</h3>
			<p>{name}</p>
			<p>{email}</p>
			<button className='btn primary' onClick={logout}>
				logout
			</button>
		</div>
	)
}

export default Account
