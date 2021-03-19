import wordsearch from 'wordsearch-generator'
import {
	WORDSEARCH_GENERATE,
	GAME_START,
	GAME_RESET,
	GAME_SET_GUESS,
	GAME_ADD_CLICK,
	GAME_CLEAR_CLICK,
	GAME_FOUND_WORD,
	GAME_SET_DIRECTION,
	GAME_CELEBRATE_ON,
	GAME_CELEBRATE_OFF,
	GRID_PUBLIC_REQUEST,
	GRID_PUBLIC_SUCCESS,
	GRID_PUBLIC_FAIL,
	GRID_GAME_REQUEST,
	GRID_GAME_SUCCESS,
	GRID_GAME_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_SET_INFO,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from './types'

const reducer = (state, action) => {
	switch (action.type) {
		case WORDSEARCH_GENERATE:
			const newGame = action.payload
			const { words, size, language } = newGame
			const newAnswerGrid = wordsearch.createPuzzle(
				size.x,
				size.y,
				language,
				words
			)
			const newPuzzleGrid = wordsearch.hideWords(newAnswerGrid, language)
			return {
				...state,
				loading: false,
				game: {
					...newGame,
					puzzleGrid: [...newPuzzleGrid],
					answerGrid: [...newAnswerGrid],
				},
			}

		case GAME_START:
			let startGame = action.payload
			let wordsUpperCase = startGame.words.map((word) => {
				const noSpaces = word.replace(/ /g, '')
				return noSpaces.toUpperCase()
			})
			return {
				...state,
				guess: '',
				guessId: [],
				direction: '',
				wordsAvailable: wordsUpperCase,
				wordsGuessed: [],
				playing: true,
			}

		case GAME_RESET:
			return {
				...state,
				game: {},
				guess: '',
				guessId: [],
				direction: '',
				wordsAvailable: [],
				wordsGuessed: [],
			}

		case GAME_SET_GUESS:
			return {
				...state,
				guess: action.payload,
			}
		case GAME_FOUND_WORD:
			const foundWord = action.payload
			return {
				...state,
				wordsAvailable: state.wordsAvailable.filter(
					(word) => word !== foundWord
				),
				wordsGuessed: [...state.wordsGuessed, foundWord],
				guess: '',
				direction: '',
			}
		case GAME_ADD_CLICK:
			return {
				...state,
				guessId: [...state.guessId, action.payload],
			}
		case GAME_CLEAR_CLICK:
			return {
				...state,
				guess: '',
				guessId: [],
				direction: '',
			}
		case GAME_SET_DIRECTION:
			return {
				...state,
				direction: action.payload,
			}

		case GAME_CELEBRATE_ON:
			return {
				...state,
				celebrate: true,
			}
		case GAME_CELEBRATE_OFF:
			return {
				...state,
				celebrate: false,
				playing: false,
			}

		case GRID_PUBLIC_REQUEST:
			return { ...state, loading: true }
		case GRID_PUBLIC_SUCCESS:
			return { ...state, loading: false, publicGrids: action.payload }
		case GRID_PUBLIC_FAIL:
			return { ...state, loading: false, error: action.payload }

		case GRID_GAME_REQUEST:
			return { ...state, loading: true }
		case GRID_GAME_SUCCESS:
			return { ...state, loading: false, currentGrid: action.payload }
		case GRID_GAME_FAIL:
			return { ...state, loading: false, error: action.payload }

		case USER_LOGIN_REQUEST:
			return { ...state, loading: true }
		case USER_LOGIN_SUCCESS:
		case USER_SET_INFO:
			return { ...state, loading: false, userInfo: action.payload }
		case USER_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload }
		case USER_LOGOUT:
			return { ...state, loading: false, userInfo: null }
		case USER_REGISTER_REQUEST:
			return { ...state, loading: true }
		case USER_REGISTER_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload }
		case USER_REGISTER_FAIL:
			return { ...state, loading: false, error: action.payload }

		default:
			return state
	}
	throw new Error('No matching action type', action.type)
	return state
}

export default reducer
