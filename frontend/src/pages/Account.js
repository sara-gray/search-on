import React, { useState, useEffect } from 'react'
import { notify } from '../components/notify'
import { useGlobalContext } from '../context/context'

const Account = ({ history, location }) => {
	const { userInfo, error } = useGlobalContext()
	const [name, setName] = useState(userInfo ? userInfo.name : '')
	const [email, setEmail] = useState(userInfo ? userInfo.email : '')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const handleSubmit = (e) => {
		e.preventDefault()
		if (name && email && password && confirmPassword) {
			if (password !== confirmPassword) {
				notify('Your passwords do not match', 'ERROR')
			} else {
				// updateUser(name, email, password)
				console.log('update user details', name, email, password)
			}
		}
	}

	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [userInfo])

	useEffect(() => {
		if (error) {
			notify(error, 'ERROR')
		}
	}, [error])

	return (
		userInfo && (
			<div className='section'>
				<form onSubmit={handleSubmit} className='login-form account-form'>
					<h3>Account Details</h3>
					<p>Type into the account fields below to change your user details</p>
					<div className='form-control'>
						<input
							type='text'
							className='login'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type='email'
							className='login'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='password'
							className='login'
							placeholder='Reset Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<input
							type='password'
							className='login'
							placeholder='Confirm password'
							value={confirmPassword}
							disabled={password.length === 0 ? true : false}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button type='submit' className='btn primary'>
							Update User Details
						</button>
					</div>
				</form>
			</div>
		)
	)
}

export default Account
