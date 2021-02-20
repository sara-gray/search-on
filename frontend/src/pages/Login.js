import React from 'react'
import { notify } from '../components/notify'

const Login = () => {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Login</h1>

			<button
				onClick={() => {
					notify('My life is great')
				}}>
				Press Me Now
			</button>
		</div>
	)
}

export default Login
