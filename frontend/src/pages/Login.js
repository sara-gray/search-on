import React from 'react'
<<<<<<< Updated upstream
import Message from '../components/Message'
=======
import { toast } from 'react-toastify'
>>>>>>> Stashed changes

const Login = () => {
	const notify = (message) => {
		toast.success(message, { position: toast.POSITION.BOTTOM_LEFT })
		toast.error(message, {
			position: toast.POSITION.BOTTOM_LEFT,
			autoClose: 3000,
		})
	}
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Login</h1>
<<<<<<< Updated upstream
			<Message message={{ text: 'hello world', status: 'success' }} />
			<Message message={{ text: 'hello world', status: 'danger' }} />
=======

			<button
				onClick={() => {
					notify('My life is great')
				}}>
				Press Me Now
			</button>
>>>>>>> Stashed changes
		</div>
	)
}

export default Login
