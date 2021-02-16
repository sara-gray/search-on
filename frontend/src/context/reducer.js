import wordsearch from 'wordsearch-generator'
import {
	MESSAGE_CLEAR,
	MESSAGE_SET,
	WORDSEARCH_INCREASE_GUESSED,
	WORDSEARCH_GENERATE,
	WORDSEARCH_SET_GUESS,
	GAME_RESET,
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
		case WORDSEARCH_SET_GUESS:
			return {
				...state,
				guess: action.payload,
			}
		case WORDSEARCH_INCREASE_GUESSED:
			return {
				...state,
				numberGuessed: state.numberGuessed + 1,
				wordsGuessed: [...state.wordsGuessed, state.guess],
				guess: '',
			}
		case GAME_RESET:
			return {
				...state,
				numberGuessed: 0,
				guess: '',
				wordsGuessed: [],
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
