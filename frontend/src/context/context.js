import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
import { GENERATE_WORDSEARCH } from './types'

const AppContext = React.createContext()

const initialState = {
	loading: false,
	current: {
		id: 1,
		title: 'Random animals',
		words: ['ant', 'monkey', 'cat', 'dog', 'bald eagle'],
		size: { x: 10, y: 10 },
		language: 'en',
		puzzleGrid: [],
		answerGrid: [],
	},
	message: { text: 'this is my default message', status: 'success' },
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const generateWordsearch = () => {
		dispatch({ type: GENERATE_WORDSEARCH })
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				generateWordsearch,
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
