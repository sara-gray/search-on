import React, { useState } from 'react'

const SMALL = { x: 10, y: 10 }
const MEDIUM = { x: 15, y: 15 }
const LARGE = { x: 20, y: 20 }

const Edit = () => {
	const editID = ''
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [word, setWord] = useState('')
	const [words, setWords] = useState([])
	const [size, setSize] = useState(MEDIUM)
	const [language, setLanguage] = useState('en')

	const handleSubmit = (e) => {
		e.preventDefault()

		console.log('save form', title, desc, words, size, language)
	}
	const addWord = (e) => {
		e.preventDefault()
		console.log('add word')
	}
	return (
		<div className='section edit-form'>
			<form className='edit-form-control' onSubmit={handleSubmit}>
				<label htmlFor='title'>Wordsearch title:</label>
				<input
					id='title'
					type='text'
					className='edit-input'
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>

				<label htmlFor='desc'>
					Enter a brief description of your wordsearch:
				</label>
				<textarea id='desc' name='desc'></textarea>
				<div className='edit-grid-size'>
					<p>Select a grid size:</p>
					<label htmlFor='small'>Small 10x10</label>
					<input
						type='radio'
						id='small'
						value='10x10'
						checked
						onChange={(e) => setSize(e.target.value ? SMALL : {})}
					/>

					<label htmlFor='medium'>Medium 15x15</label>
					<input
						type='radio'
						id='medium'
						value='15x15'
						onChange={(e) => setSize(e.target.value ? MEDIUM : {})}
					/>

					<label htmlFor='large'>Large</label>
					<input
						type='radio'
						id='louie'
						value='20x20'
						onChange={(e) => setSize(e.target.value ? LARGE : {})}
					/>
				</div>

				<label htmlFor='pet-select'>Choose a language:</label>

				<select id='language-select'>
					<option value=''>--Please choose an option--</option>
					<option value='en'>English</option>
				</select>
			</form>
			<form onSubmit={addWord}>
				<label htmlFor='words'>
					Type in your words separated by a comma (csv):
				</label>
				<textarea id='words' name='words' rows='5' cols='33'></textarea>
				<button type='submit' className='btn primary'>
					{editID ? 'Update' : 'Create'}
				</button>
			</form>
		</div>
	)
}

export default Edit
