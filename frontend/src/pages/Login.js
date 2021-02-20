import React from 'react'
import { notify } from '../components/notify'

const Login = () => {
	return (
		<div className='section' style={{ marginTop: '2rem' }}>
			<div className=' card large-card'>
				<h2>Coming soon...</h2>
				<br />
				<p>You will soon be able to login and build your own wordsearches.</p>
				<p>Each grid is fully customisable: </p>
				<ul style={{ listStyleType: 'circle' }}>
					<li>Title</li>
					<li>Description</li>
					<li>
						Words - you can include more than one word e.g. 'my name' will by
						'myname' in the grid
					</li>
					<li>Grid size - horizontal by vertical</li>
				</ul>
			</div>
		</div>
	)
}

export default Login
