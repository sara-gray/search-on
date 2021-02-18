import React from 'react'
import Message from '../components/Message'

const Login = () => {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Login</h1>
			<Message message={{ text: 'hello world', status: 'success' }} />
			<Message message={{ text: 'hello world', status: 'danger' }} />
		</div>
	)
}

export default Login
