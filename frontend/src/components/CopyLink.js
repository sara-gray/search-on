import React from 'react'
import { notify } from '../components/notify'
import { MdContentCopy } from 'react-icons/md'

const CopyLink = () => {
	const handleClick = () => {
		let dummy = document.createElement('input'),
			text = window.location.href

		document.body.appendChild(dummy)
		dummy.value = text
		dummy.select()
		document.execCommand('copy')
		document.body.removeChild(dummy)
		notify('Link copied to clipboard', 'SUCCESS')
	}
	return (
		<div className='copylink'>
			<button className='btn' onClick={handleClick}>
				<MdContentCopy style={{ fontSize: '1.2rem' }} />
			</button>
		</div>
	)
}

export default CopyLink
