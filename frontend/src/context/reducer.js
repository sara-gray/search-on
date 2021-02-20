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
	FETCH_PUBLIC_REQUEST,
	FETCH_PUBLIC_SUCCESS,
	FETCH_PUBLIC_FAIL,
	SET_LOADING,
	CLEAR_LOADING,
	FETCH_GAME_REQUEST,
	FETCH_GAME_SUCCESS,
	FETCH_GAME_FAIL,
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
			const wordsUpperCase = state.game.words.map((word) => {
				const noSpaces = word.replace(/ /g, '')
				return word.toUpperCase()
			})
			return {
				...state,
				guess: '',
				guessId: [],
				direction: '',
				wordsAvailable: wordsUpperCase,
				wordsGuessed: [],
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
			}

		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		case CLEAR_LOADING:
			return {
				...state,
				loading: false,
			}

		case FETCH_PUBLIC_SUCCESS:
			return {
				...state,
				loading: false,
				publicIds: action.payload,
			}
		case FETCH_PUBLIC_FAIL:
			return {
				...state,
				loading: false,
			}
	}
	throw new Error('No matching action type', action.type)
	return state
}

export default reducer
