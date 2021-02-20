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
	GAME_SET_DIRECTION,
	GAME_CELEBRATE_ON,
	GAME_CELEBRATE_OFF,
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

		default:
			throw new Error('No matching action type')
	}
}

export default reducer
