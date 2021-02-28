import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { notify } from '../components/notify'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleClick = (e) => {
		e.preventDefault()
		alert('time to login')
	}

	return (
		<div className='section'>
			<form className='login-form'>
				<h3>Login</h3>
				<div className='form-control'>
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
					<p style={{ fontSize: '0.8rem' }}>
						Not registered? <Link to='/register'>Register</Link>
					</p>
					<button type='button' onClick={handleClick} className='btn primary'>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
