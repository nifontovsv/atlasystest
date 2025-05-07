import { configureStore } from '@reduxjs/toolkit'
import callsReducer from '../reducers/callsReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const saveToLocalStorage = (state: any) => {
	try {
		const serializedState = JSON.stringify(state.calls.calls)
		localStorage.setItem('calls', serializedState)
	} catch (e) {
		console.warn('Ошибка при сохранении в localStorage:', e)
	}
}

export const store = configureStore({
	reducer: {
		calls: callsReducer,
	},
})

store.subscribe(() => {
	saveToLocalStorage(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
