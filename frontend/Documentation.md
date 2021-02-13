## worsearch-generator package

[npm page location](https://www.npmjs.com/package/wordsearch-generator)

## API

- createPuzzle(width, height, languageCode, words)
- Primary function that generates the puzzle
- languageCode such as 'en' for english
- words is an array of strings

- hideWords(grid, languageCode)
- Returns a new grid where each 0 element is replaced by a random letter in the given language

- printGrid(grid, space)
- Returns an array of strings. Each string represents a row of the puzzle that is formatted with spaces
- space is a boolean value that when true turns all 0 elements into additional spaces
- space option only has an effect if hideWords has not been called
- useful for printing an answer sheet to the puzzle
