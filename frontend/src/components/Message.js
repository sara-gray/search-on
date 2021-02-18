import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/context'

const Message = ({ message }) => {
	const { text, status } = message

	const [displayMessage, setDisplayMessage] = useState(false)
	const [timeID, setTimeID] = useState(null)

	const setToastTimer = () => {
		const id = setTimeout(() => {
			setDisplayMessage(false)
			setTimeID(null)
		}, 3000)
		setTimeID(id)
	}
	useEffect(() => {
		setToastTimer()
		setDisplayMessage(true)
		return () => {
			setDisplayMessage(false)
			if (timeID !== null) clearTimeout(timeID)
			setTimeID(null)
		}
	}, [])

	return displayMessage && <div className={`message ${status}`}>{text}</div>
}

export default Message
