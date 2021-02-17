import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useGlobalContext } from '../context/context'

const Celebrate = () => {
	const { celebrateOff, gameReset } = useGlobalContext()
	const handleConfettiOver = () => {
		celebrateOff()
		gameReset('Well done, you have found them all!')
	}

	return (
		<Confetti
			recycle={false}
			numberOfPieces={800}
			initialVelocityY={3}
			onConfettiComplete={handleConfettiOver}
		/>
	)
}

export default Celebrate
