import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import {
	MESSAGE_CLEAR,
	MESSAGE_SET,
	WORDSEARCH_GENERATE,
	GAME_RESET,
	GAME_ADD_CLICK,
	GAME_CLEAR_CLICK,
	GAME_SET_GUESS,
	GAME_SET_DIRECTION,
	GAME_CELEBRATE_ON,
	GAME_CELEBRATE_OFF,
	GAME_FOUND_WORD,
} from './types'

const AppContext = React.createContext()

const initialState = {
	loading: false,

	id: 1,
	title: 'Random animals',
	private: true,
	desc: 'A random bit of animal fun',
	// words: ['ant', 'monkey', 'cat', 'dog', 'eagle'],
	words: ['cat', 'dog'],
	size: { x: 5, y: 5 },
	language: 'en',
	puzzleGrid: [],
	answerGrid: [],

	guess: '',
	guessId: [],
	direction: '',
	wordsAvailable: [],
	wordsGuessed: [],
	celebrate: false,

	message: {},
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	// Edit actions
	const generateWordsearch = () => {
		dispatch({ type: WORDSEARCH_GENERATE })
	}

	// Play actions
	const addToClickHistory = (id) => {
		dispatch({ type: GAME_ADD_CLICK, payload: id })
	}
	const clearClickHistory = () => {
		dispatch({ type: GAME_CLEAR_CLICK })
	}
	const setDirection = (direction) => {
		dispatch({ type: GAME_SET_DIRECTION, payload: direction })
	}
	const addToGuess = (guess) => {
		dispatch({ type: GAME_SET_GUESS, payload: guess })
	}
	const foundWord = (word) => {
		setMessage('Well done, you found a word!', 'success')
		dispatch({ type: GAME_FOUND_WORD, payload: word })
	}
	const celebrateOn = () => {
		dispatch({ type: GAME_CELEBRATE_ON })
	}
	const celebrateOff = () => {
		dispatch({ type: GAME_CELEBRATE_OFF })
	}
	const gameReset = () => {
		dispatch({ type: GAME_RESET })
	}
	const gameOver = (message) => {
		setMessage(message)
		celebrateOn()
	}

	// Message actions
	const clearMessage = () => {
		dispatch({ type: MESSAGE_CLEAR })
	}
	const setMessage = (text, status = 'success') => {
		dispatch({ type: MESSAGE_SET, payload: { text, status } })
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				generateWordsearch,
				addToClickHistory,
				clearClickHistory,
				addToGuess,
				foundWord,
				setDirection,
				celebrateOn,
				celebrateOff,
				gameReset,
				gameOver,
				clearMessage,
				setMessage,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
