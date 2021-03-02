import React, { useContext, useReducer } from 'react'
import { notify } from '../components/notify'
import { toast } from 'react-toastify'
import reducer from './reducer'
import axios from 'axios'

import publicGames from './publicGames'
import gameData from './data'

import {
	WORDSEARCH_GENERATE,
	GAME_START,
	GAME_RESET,
	GAME_ADD_CLICK,
	GAME_CLEAR_CLICK,
	GAME_SET_GUESS,
	GAME_SET_DIRECTION,
	GAME_CELEBRATE_ON,
	GAME_CELEBRATE_OFF,
	GAME_FOUND_WORD,
	SET_LOADING,
	CLEAR_LOADING,
	FETCH_PUBLIC_REQUEST,
	FETCH_PUBLIC_SUCCESS,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_DETAILS_LOGOUT,
	USER_SET_INFO,
} from './types'

const AppContext = React.createContext()

const initialState = {
	loading: false,
	publicIds: [],
	playing: false,
	game: {},
	guess: '',
	guessId: [],
	direction: '',
	wordsAvailable: [],
	wordsGuessed: [],
	celebrate: false,
	userInfo: null,
	error: null,
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	// Play actions
	const gameStart = (game) => {
		dispatch({ type: GAME_START, payload: game })
	}
	const gameReset = () => {
		dispatch({ type: GAME_CELEBRATE_OFF })
		dispatch({ type: GAME_RESET })
	}
	const gameOver = () => {
		notify('Game over, yey!', 'SUCCESS')
		dispatch({ type: GAME_CELEBRATE_ON })
	}
	const gameRestart = () => {
		dispatch({ type: GAME_CELEBRATE_OFF })
		// dispatch({ type: GAME_RESET })
	}

	const setDirection = (direction) => {
		dispatch({ type: GAME_SET_DIRECTION, payload: direction })
	}
	const addToClickHistory = (id) => {
		dispatch({ type: GAME_ADD_CLICK, payload: id })
	}
	const clearClickHistory = () => {
		dispatch({ type: GAME_CLEAR_CLICK })
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

	// Fetch actions
	const setLoading = () => {
		// dispatch({ type: SET_LOADING })
	}
	const clearLoading = () => {
		// dispatch({ type: CLEAR_LOADING })
	}
	const fetchPublicGames = () => {
		// setLoading()
		const games = [...publicGames]
		dispatch({ type: FETCH_PUBLIC_SUCCESS, payload: games })
		return games
	}
	const fetchGame = (id) => {
		const data = [...gameData]
		if (data) {
			const findGame = data.filter((item) => item.id === Number(id))
			return findGame[0]
		}
		return null
	}
	const generateWordsearch = (newGame) => {
		dispatch({ type: WORDSEARCH_GENERATE, payload: newGame })
	}

	// User actions
	const setUserInfo = (user) => {
		dispatch({ type: USER_SET_INFO, payload: user })
	}

	const login = async (email, password) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST })
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users/login',
				{ email, password },
				config
			)

			dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const logout = async () => {
		localStorage.removeItem('userInfo')
		dispatch({ type: USER_LOGOUT })
		// dispatch({ type: USER_DETAILS_LOGOUT })
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				gameStart,
				gameOver,
				gameReset,
				gameRestart,
				setDirection,
				addToClickHistory,
				clearClickHistory,
				addToGuess,
				foundWord,
				setLoading,
				clearLoading,
				fetchPublicGames,
				fetchGame,
				generateWordsearch,
				setUserInfo,
				login,
				logout,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
