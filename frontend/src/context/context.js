import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import {
	MESSAGE_CLEAR,
	MESSAGE_SET,
	WORDSEARCH_GENERATE,
	WORDSEARCH_SET_GUESS,
	WORDSEARCH_INCREASE_GUESSED,
	GAME_RESET,
} from './types'

const AppContext = React.createContext()

const initialState = {
	loading: false,

	id: 1,
	title: 'Random animals',
	// words: ['ant', 'monkey', 'cat', 'dog', 'eagle'],
	words: ['cat', 'dog'],
	size: { x: 5, y: 5 },
	language: 'en',
	puzzleGrid: [],
	answerGrid: [],

	guess: '',
	numberGuessed: 0,
	wordsGuessed: [],

	message: {},
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	// Play actions
	const generateWordsearch = () => {
		dispatch({ type: WORDSEARCH_GENERATE })
	}
	const addToGuess = (guess) => {
		dispatch({ type: WORDSEARCH_SET_GUESS, payload: guess })
	}
	const correctGuess = () => {
		setMessage('Well done, you found a word!', 'success')
		dispatch({ type: WORDSEARCH_INCREASE_GUESSED })
	}
	const gameReset = () => {
		setMessage('Game over!', 'success')
		dispatch({ type: GAME_RESET })
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
				addToGuess,
				correctGuess,
				gameReset,
				clearMessage,
				setMessage,
			}}>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
