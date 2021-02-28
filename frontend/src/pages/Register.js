import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { notify } from '../components/notify'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleClick = (e) => {
		e.preventDefault()
		alert('time to register')
	}

	return (
		<div className='section'>
			<form className='login-form'>
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
					<button type='button' onClick={handleClick} className='btn primary'>
						Register
					</button>
				</div>
			</form>
		</div>
	)
}

export default Register
