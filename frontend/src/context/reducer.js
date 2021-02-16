import wordsearch from 'wordsearch-generator'
import { GENERATE_WORDSEARCH } from './types'

const reducer = (state, action) => {
	switch (action.type) {
		case GENERATE_WORDSEARCH:
			const { words, size, language } = state.current
			const newAnswerGrid = wordsearch.createPuzzle(
				size.x,
				size.y,
				language,
				words
			)
			const newPuzzleGrid = wordsearch.hideWords(newAnswerGrid, language)
			return {
				...state,
				current: {
					...state.current,
					puzzleGrid: newPuzzleGrid,
					answerGrid: newAnswerGrid,
				},
			}
		default:
			return { ...state }
	}
}

export default reducer
