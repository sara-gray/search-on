import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { notify } from '../components/notify'
import { useGlobalContext } from '../context/context'

const Register = ({ history, location }) => {
	const { userInfo, error, register } = useGlobalContext()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const handleSubmit = (e) => {
		e.preventDefault()
		if (name && email && password && confirmPassword) {
			if (password !== confirmPassword) {
				notify('Your passwords do not match', 'ERROR')
			} else {
				register(name, email, password)
			}
		}
	}

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [userInfo])

	useEffect(() => {
		if (error) {
			notify(error, 'ERROR')
		}
	}, [error])

	return (
		<div className='section'>
			<form onSubmit={handleSubmit} className='login-form'>
				<h3>Register</h3>
				<div className='form-control'>
					<input
						type='text'
						className='login'
						placeholder='Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type='email'
						className='login'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						className='login'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<input
						type='password'
						className='login'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<p style={{ fontSize: '0.8rem' }}>
						Already registered? <Link to='/login'>Login</Link>
					</p>
					<button type='submit' className='btn primary'>
						Register
					</button>
				</div>
			</form>
		</div>
	)
}

export default Register
