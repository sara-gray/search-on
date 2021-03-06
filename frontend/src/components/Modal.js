import React from 'react'

const Modal = (
	title = 'Title',
	text = 'Modal text',
	passwordRequired = true
) => {
	return (
		<div className='modal'>
			<h2>{title}</h2>
			<p>{text}</p>
			{passwordRequired && <input type='password'>Password required</input>}
			<button>Confirm</button>
			<button>Cancel</button>
		</div>
	)
}

export default Modal
