import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { notify } from '../components/notify'
import { useGlobalContext } from '../context/context'

const Login = () => {
	const { login } = useGlobalContext()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if (email && password) login(email, password)
	}

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
