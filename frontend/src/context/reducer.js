import wordsearch from 'wordsearch-generator'
import {
	MESSAGE_CLEAR,
	MESSAGE_SET,
	WORDSEARCH_GENERATE,
	GAME_RESET,
	GAME_SET_GUESS,
	GAME_ADD_CLICK,
	GAME_CLEAR_CLICK,
	GAME_FOUND_WORD,
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
		case GAME_FOUND_WORD:
			const foundWord = action.payload
			return {
				...state,
				wordsAvailable: state.wordsAvailable.filter(
					(word) => word !== foundWord
				),
				wordsGuessed: [...state.wordsGuessed, foundWord],
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
				guess: '',
				guessId: [],
				direction: '',
			}
		case GAME_RESET:
			const wordsUpperCase = state.words.map((word) => {
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

		case MESSAGE_CLEAR:
			return { ...state, message: {} }
		case MESSAGE_SET:
			return { ...state, message: action.payload }

		default:
			throw new Error('No matching action type')
	}
}

export default reducer
