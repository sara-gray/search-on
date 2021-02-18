import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useGlobalContext } from '../context/context'
import { GAME_RESET } from '../context/types'

const Celebrate = () => {
	const { celebrateOff, celebrate, gameReset } = useGlobalContext()
	const handleConfettiOver = () => {
		celebrateOff()
		gameReset()
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
