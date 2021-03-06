import React from 'react'

const Info = () => {
	return (
		<div className='section' style={{ marginTop: '2rem' }}>
			<div className=' card large-card info'>
				<h2>About this app...</h2>
				<br />
				<p>
					This app was designed to be used by teachers, parents and carers to
					help provide educational wordsearches for free.
				</p>
				<p>
					To share with others, click on the 'Copy Link' icon to copy the link
					for that wordsearch to the clipboard.
				</p>
				<p>
					Now you can add the link by pasting to Google Classroom, Microsoft
					Teams, email or anywhere for others to use.
				</p>
				<p>Enjoy!</p>
				<br />
				<h4>Coming soon...</h4>
				<ul>
					<li>
						Create and save public wordsearches which can be accessed from the
						front screen for anyone to enjoy.
					</li>
					<li>
						Get feedback from your wordsearches. If you set the 'playing now'
						flag you get responses back from users including their email
						addresses, and completion times.
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Info
