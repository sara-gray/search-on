import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Info from './pages/Info'
import Login from './pages/Login'
import Register from './pages/Register'
import Play from './pages/Play'
import Edit from './pages/Edit'
import Error from './pages/Error'

function App() {
	return (
		<Router>
			<Navigation />
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
