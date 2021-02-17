import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/context'

const Message = () => {
	const { clearMessage, message } = useGlobalContext()
	const [timeID, setTimeID] = useState(null)

	const setToastTimer = () => {
		// const id = setTimeout(() => {
		// 	clearMessage()
		// }, 5000)
		// setTimeID(id)
	}
	useEffect(() => {
		if (message) setToastTimer()
		// return () => {
		// 	if (timeID) clearTimeout(timeID)
		// 	setTimeID(null)
		// }
	}, [message])

	return <div className={`message ${message.status}`}>{message.text}</div>
}

export default Message
