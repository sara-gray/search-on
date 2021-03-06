import React, { useState, useEffect } from 'react'
import { notify } from '../components/notify'
import { useGlobalContext } from '../context/context'

const Account = ({ history, location }) => {
	const { userInfo, error, updateUserProfile } = useGlobalContext()
	const [name, setName] = useState(userInfo ? userInfo.name : '')
	const [email, setEmail] = useState(userInfo ? userInfo.email : '')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const handleSubmit = (e) => {
		e.preventDefault()

		if (password && confirmPassword) {
			if (password !== confirmPassword) {
				notify('Your passwords do not match', 'ERROR')
			} else {
				const user = { ...userInfo, name, email, password }
				updateUserProfile(user)
				notify('Profile and password updated', 'SUCCESS')
				setPassword('')
				setConfirmPassword('')
			}
		} else {
			if (password) {
				notify('You must confirm your password to reset it', 'ERROR')
			} else {
				const user = { ...userInfo, name, email }
				updateUserProfile(user)
				notify('Profile updated', 'SUCCESS')
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
							placeholder='Reset password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<input
							type='password'
							className='login'
							placeholder='Confirm new password'
							value={confirmPassword}
							disabled={password.length === 0 ? true : false}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button type='submit' className='btn primary'>
							Update
						</button>
					</div>
				</form>
			</div>
		)
	)
}

export default Account
