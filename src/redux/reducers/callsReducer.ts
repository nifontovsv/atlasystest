import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Call = {
	id: string
	date: string
	time: string
	responsible: string
	type: 'Входящий' | 'Исходящий'
	priority: 'Обычный' | 'Срочный'
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
		setCalls: (state, action: PayloadAction<Call[]>) => {
			state.calls = action.payload
		},
		addCall: (state, action: PayloadAction<Call>) => {
			state.calls.unshift(action.payload)
		},
		removeCall: (state, action: PayloadAction<string>) => {
			state.calls = state.calls.filter((call) => call.id !== action.payload)
		},
		updateCallField: <K extends keyof Call>(
			state: CallState,
			action: PayloadAction<{
				id: string
				field: K
				value: Call[K]
			}>
		) => {
			const call = state.calls.find((c) => c.id === action.payload.id)
			if (call) {
				call[action.payload.field] = action.payload.value
			}
		},
	},
})

export const { addCall, removeCall, setCalls, updateCallField } =
	callsSlice.actions
export default callsSlice.reducer
