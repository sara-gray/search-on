import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/context'

const Message = () => {
	const { message } = useGlobalContext()
	const [showMessage, setShowMessage] = useState(true)

	const setToastTimer = () => {
		setTimeout(() => {
			console.log('clear toast')
			setShowMessage(!showMessage)
		}, 3000)
	}
	useEffect(() => {
		if (showMessage) setToastTimer()
	}, [])

	return (
		showMessage && (
			<div className={`message ${message.status}`}>{message.text}</div>
		)
	)
}

export default Message
