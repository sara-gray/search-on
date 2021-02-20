import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

<<<<<<< Updated upstream
import { useGlobalContext } from './context/context'
=======
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
>>>>>>> Stashed changes

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Info from './pages/Info'
import Login from './pages/Login'
import Register from './pages/Register'
import Play from './pages/Play'
import Edit from './pages/Edit'
import Error from './pages/Error'

toast.configure()
function App() {
<<<<<<< Updated upstream
	const { loading } = useGlobalContext()

	if (loading) return <h1>Loading...</h1>

=======
	const notify = () =>
		toast('I love my life', { position: toast.POSITION.BOTTOM_LEFT })
>>>>>>> Stashed changes
	return (
		<Router>
			<Navigation />
			<ToastContainer />
			<button onClick={notify}>Press Me</button>
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/info' component={Info} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/edit' component={Edit} />
				<Route path='/play' component={Play} />
				<Route path='*' component={Error} />
			</Switch>
		</Router>
	)
}

export default App
