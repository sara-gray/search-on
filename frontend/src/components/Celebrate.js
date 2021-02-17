import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useGlobalContext } from '../context/context'

const Celebrate = () => {
	const { celebrateOff } = useGlobalContext()
	const [timerId, setTimerId] = useState(null)

	return <Confetti />
}

export default Celebrate
