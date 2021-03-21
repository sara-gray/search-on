import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/context'

const Edit = ({ location }) => {
	const languages = [{ code: 'en', text: 'English' }]
	const { fetchGrid, currentGrid } = useGlobalContext()
	const [editID, setEditID] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [sizeX, setSizeX] = useState(0)
	const [sizeY, setSizeY] = useState(0)
	const [language, setLanguage] = useState('en')
	const [words, setWords] = useState('')

	useEffect(() => {
		const pages = location.pathname.split('/')
		const id = pages[pages.length - 1]

		if (id !== 'edit') {
			setEditID(id)
			fetchGrid(id)
		}

		return () => {
			console.log('finished editing')
			// clear current grid in reducer
		}
	}, [])

	const decode = (code) => {
		return languages.filter((lang) => lang.code === code).text
	}

	const wordsToString = (words) => {
		console.log(words, words.join())
		return words.join()
	}

	useEffect(() => {
		if (currentGrid) {
			const { title, desc, words, size, language } = currentGrid
			setTitle(title)
			setDescription(desc)
			setSizeX(size.x)
			setSizeY(size.y)
			setLanguage(language)
			setWords(wordsToString(words))
		}
	}, [currentGrid])

	const handleSubmit = (e) => {
		e.preventDefault()

		const grid = {
			editID,
			title,
			description,
			size: { sizeX, sizeY },
			language,
			words,
		}

		if (editID === '') {
			console.log('create grid', grid)
		} else {
			console.log('update grid', grid)
		}
	}

	return (
		<div className='section'>
			<form className='edit-form' onSubmit={handleSubmit}>
				<input
					id='title'
					type='text'
					className='edit-input-line'
					placeholder='Give your word grid a title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<label htmlFor='desc'>Enter a brief description of your grid:</label>
				<textarea
					id='desc'
					name='desc'
					className='edit-input-line'
					rows='3'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<label htmlFor='desc'>Words or phrases separated by commas (CSV)</label>
				<textarea
					id='words'
					name='words'
					className='edit-input-line'
					rows='10'
					value={words}
					// onChange={(e) => setWords(e.target.value)}
				/>

				<p>Select a grid size:</p>
				<div className='edit-grid-size'>
					<label htmlFor='sizeX'>Width:</label>
					<input
						id='sizeX'
						name='sizeX'
						type='number'
						min='5'
						max='20'
						className='edit-size-number'
						placeholder='10'
						value={sizeX}
						onChange={(e) => setSizeX(e.target.value)}
					/>
					<label htmlFor='sizeY'>Height:</label>
					<input
						id='sizeY'
						name='sizeY'
						type='number'
						min='5'
						max='20'
						className='edit-size-number'
						placeholder='10'
						value={sizeY}
						onChange={(e) => setSizeY(e.target.value)}
					/>
				</div>
				<p>Change your language:</p>
				<select
					id='edit-language-select'
					className='edit-language-select edit-input-line'
					value={language}
					onChange={(e) => setLanguage(e.target.value)}>
					<option value='en'>English</option>
					<option value='cy'>Welsh</option>
					<option value='it'>Italian</option>
				</select>
				<button type='submit' className='btn primary'>
					{editID ? 'Update' : 'Create'}
				</button>
			</form>
		</div>
	)
}

export default Edit
