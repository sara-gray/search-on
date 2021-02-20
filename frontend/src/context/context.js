import React, { useContext, useReducer } from 'react'
import { notify } from '../components/notify'
import { toast } from 'react-toastify'
import reducer from './reducer'
import {
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
		notify('You have found a word!', 'INFO', {
			position: toast.POSITION.TOP_LEFT,
			autoClose: 3000,
		})
		dispatch({ type: GAME_FOUND_WORD, payload: word })
	}
	const gameReset = () => {
		dispatch({ type: GAME_CELEBRATE_OFF })
		dispatch({ type: GAME_RESET })
	}
	const gameOver = () => {
		notify('Game over, yey!', 'SUCCESS')
		dispatch({ type: GAME_CELEBRATE_ON })
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
				gameOver,
				gameReset,
				setDirection,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
