import wordsearch from 'wordsearch-generator'
import {
	MESSAGE_CLEAR,
	MESSAGE_SET,
	WORDSEARCH_GENERATE,
	GAME_RESET,
	GAME_SET_GUESS,
	GAME_INCREASE_GUESSED,
	GAME_ADD_CLICK,
	GAME_CLEAR_CLICK,
} from './types'

const reducer = (state, action) => {
	switch (action.type) {
		case WORDSEARCH_GENERATE:
			const { words, size, language } = state
			const newAnswerGrid = wordsearch.createPuzzle(
				size.x,
				size.y,
				language,
				words
			)
			const newPuzzleGrid = wordsearch.hideWords(newAnswerGrid, language)
			return {
				...state,
				puzzleGrid: newPuzzleGrid,
				answerGrid: newAnswerGrid,
			}
		case GAME_SET_GUESS:
			return {
				...state,
				guess: action.payload,
			}
		case GAME_INCREASE_GUESSED:
			return {
				...state,
				numberGuessed: state.numberGuessed + 1,
				wordsGuessed: [...state.wordsGuessed, state.guess],
				guess: '',
			}
		case GAME_ADD_CLICK:
			return {
				...state,
				guessId: [...state.guessId, action.payload],
			}
		case GAME_CLEAR_CLICK:
			return {
				...state,
				guessId: [],
				guess: '',
			}
		case GAME_RESET:
			return {
				...state,
				guess: '',
				guessId: [],
				wordsGuessed: [],
				numberGuessed: 0,
			}

		case MESSAGE_CLEAR:
			return { ...state, message: {} }
		case MESSAGE_SET:
			return { ...state, message: action.payload }

		default:
			throw new Error('No matching action type')
	}
}

export default reducer
