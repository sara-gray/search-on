import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { notify } from '../components/notify'
import { useGlobalContext } from '../context/context'

const Login = ({ history, location }) => {
	const { login, userInfo, error } = useGlobalContext()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if (email && password) {
			login(email, password)
		}
	}

	useEffect(() => {
		if (error) {
			notify(error, 'ERROR')
		} else if (userInfo) {
			// history.push(redirect)
			console.log(userInfo)
		}
	}, [error, userInfo])

	return (
		<div className='section'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h3>Login</h3>
				<div className='form-control'>
					<input
						id='name'
						type='email'
						className='login'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						id='password'
						type='password'
						className='login'
						placeholder='Password'
						value={password}
						minLength='8'
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p style={{ fontSize: '0.8rem' }}>
						Not registered? <Link to='/register'>Register</Link>
					</p>
					<button type='submit' className='btn primary'>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
