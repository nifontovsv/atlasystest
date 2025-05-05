import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Call = {
	id: number
	date: string
	time: string
	responsible: string
	type: string
	priority: string
}

interface CallState {
	calls: Call[]
}

const initialState: CallState = {
	calls: [],
}

const callsSlice = createSlice({
	name: 'calls',
	initialState,
	reducers: {
		addCall: (state, action: PayloadAction<Call>) => {
			state.calls.push(action.payload)
		},
		removeCall: (state, action: PayloadAction<number>) => {
			state.calls = state.calls.filter((call) => call.id !== action.payload)
		},
	},
})

export const { addCall, removeCall } = callsSlice.actions
export default callsSlice.reducer
