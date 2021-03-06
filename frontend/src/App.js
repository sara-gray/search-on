import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Info from './pages/Info'
import Login from './pages/Login'
import Account from './pages/Account'
import Register from './pages/Register'
import Play from './pages/Play'
import Edit from './pages/Edit'
import Error from './pages/Error'
import { useGlobalContext } from './context/context'

toast.configure()

function App() {
	const { setUserInfo, userInfo } = useGlobalContext()

	useEffect(() => {
		setUserInfo(
			localStorage.getItem('userInfo')
				? JSON.parse(localStorage.getItem('userInfo'))
				: null
		)
	}, [])

	return (
		<Router>
			<Navigation />
			<ToastContainer />
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/info' component={Info} />
				<Route path='/login' component={Login} />
				<Route path='/account' component={Account} />
				<Route path='/register' component={Register} />
				<Route path='/edit' component={Edit} />
				<Route path='/play/:id' component={Play} />
				<Route path='*' component={Error} />
			</Switch>
		</Router>
	)
}

export default App
