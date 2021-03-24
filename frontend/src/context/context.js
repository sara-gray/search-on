import React, { useContext, useReducer } from 'react'
import { notify } from '../components/notify'
import { toast } from 'react-toastify'
import reducer from './reducer'
import axios from 'axios'

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
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_SET_INFO,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	GRID_PUBLIC_REQUEST,
	GRID_PUBLIC_SUCCESS,
	GRID_PUBLIC_FAIL,
	GRID_GAME_SUCCESS,
	GRID_GAME_REQUEST,
	GRID_GAME_RESET,
	GRID_GAME_FAIL,
	GRID_USER_REQUEST,
	GRID_USER_SUCCESS,
	GRID_USER_FAIL,
	GRID_CREATE_SUCCESS,
	GRID_CREATE_REQUEST,
	GRID_CREATE_FAIL,
	GRID_UPDATE_SUCCESS,
	GRID_UPDATE_REQUEST,
	GRID_UPDATE_FAIL,
} from './types'

const AppContext = React.createContext()

const initialState = {
	loading: false,
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
	publicGrids: null,
	userGrids: null,
	currentGrid: null,
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	// Word search generation
	const generateWordsearch = (newGame) => {
		dispatch({ type: WORDSEARCH_GENERATE, payload: newGame })
	}

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

	// Grid actions
	const fetchPublicGrids = async () => {
		try {
			dispatch({ type: GRID_PUBLIC_REQUEST })
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.get('/api/grids', config)
			dispatch({ type: GRID_PUBLIC_SUCCESS, payload: data })
		} catch (error) {
			dispatch({
				type: GRID_PUBLIC_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
	const fetchUserGrids = async (user) => {
		try {
			dispatch({ type: GRID_USER_REQUEST })
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			}

			const { data } = await axios.get('/api/grids/user', config)
			dispatch({ type: GRID_USER_SUCCESS, payload: data })
		} catch (error) {
			dispatch({
				type: GRID_USER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
	const fetchGrid = async (id) => {
		try {
			dispatch({ type: GRID_GAME_REQUEST })
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.get(`/api/grids/${id}`, config)
			dispatch({ type: GRID_GAME_SUCCESS, payload: data })
		} catch (error) {
			dispatch({
				type: GRID_GAME_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
	const currentGridReset = () => {
		dispatch({ type: GRID_GAME_RESET })
	}
	const createGrid = async (user, grid) => {
		try {
			dispatch({ type: GRID_CREATE_REQUEST })

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			}

			const { data } = await axios.post(`/api/grids/`, grid, config)
			dispatch({ type: GRID_CREATE_SUCCESS, payload: data })
		} catch (error) {
			dispatch({
				type: GRID_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
	const updateGrid = async (user, grid) => {
		try {
			dispatch({ type: GRID_UPDATE_REQUEST })

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			}

			const { data } = await axios.put(`/api/grids/${grid._id}`, grid, config)
			dispatch({ type: GRID_UPDATE_SUCCESS, payload: data })
		} catch (error) {
			dispatch({
				type: GRID_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
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
	const register = async (name, email, password) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST })
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users',
				{ name, email, password },
				config
			)

			dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
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
	}
	const updateUserProfile = async (user) => {
		try {
			dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			}

			const { data } = await axios.put('/api/users/profile', user, config)
			dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
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
				fetchPublicGrids,
				fetchUserGrids,
				fetchGrid,
				currentGridReset,
				createGrid,
				updateGrid,
				generateWordsearch,
				setUserInfo,
				login,
				register,
				logout,
				updateUserProfile,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
