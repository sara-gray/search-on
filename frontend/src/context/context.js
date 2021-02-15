import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const AppContext = React.createContext()

const initialState = {
	loading: false,
	current: {
		id: 1,
		title: 'Random animals',
		words: ['ant', 'monkey', 'cat', 'dog', 'bald eagle'],
		size: { x: 10, y: 10 },
		language: 'en',
	},
	message: { text: 'this is my default message', status: 'success' },
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	// const clearCart = () => {
	//   dispatch({ type: 'CLEAR_CART' })
	// }
	// const remove = (id) => {
	//   dispatch({ type: 'REMOVE', payload: id })
	// }
	// const increase = (id) => {
	//   dispatch({ type: 'INCREASE', payload: id })
	// }
	// const decrease = (id) => {
	//   dispatch({ type: 'DECREASE', payload: id })
	// }
	// const fetchData = async () => {
	//   dispatch({ type: 'LOADING' })
	//   const response = await fetch(url)
	//   const cart = await response.json()
	//   dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
	// }
	// const toggleAmount = (id, type) => {
	//   dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
	// }
	// useEffect(() => {
	//   fetchData()
	// }, [])

	// useEffect(() => {
	//   dispatch({ type: 'GET_TOTALS' })
	// }, [state.cart])
	return (
		<AppContext.Provider
			value={{
				...state,
				// clearCart,
				// remove,
				// increase,
				// decrease,
				// toggleAmount,
			}}>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
