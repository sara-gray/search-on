import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useGlobalContext } from '../context/context'

const Celebrate = () => {
	const { celebrate, gameRestart } = useGlobalContext()
	const handleConfettiOver = () => {
		gameRestart()
	}

	if (!celebrate) return <></>
	return (
		<Confetti
			recycle={false}
			numberOfPieces={800}
			initialVelocityY={4}
			width={window.innerWidth}
			height={window.innerHeight}
			onConfettiComplete={handleConfettiOver}
		/>
	)
}

export default Celebrate
