import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { isFriday, isSameDay, parseISO } from 'date-fns'

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
	error: string | null
}

const initialState: CallState = {
	calls: [],
	error: null,
}

const callsSlice = createSlice({
	name: 'calls',
	initialState,
	reducers: {
		setCalls: (state, action: PayloadAction<Call[]>) => {
			state.calls = action.payload
			state.error = null
		},
		addCall: {
			reducer(state, action: PayloadAction<Call>) {
				const newCall = action.payload
				const callDateTime = parseISO(newCall.date)
				const callTime = callDateTime.getHours()

				//Проверка бизнес-правил
				const errors: string[] = []

				// 1. Проверка обеденного времени (12:00 - 14:00)
				if ([12, 13, 14].includes(callTime)) {
					errors.push(
						'Нельзя назначать звонки в обеденное время (12:00 - 14:00'
					)
				}

				// 2. Получаем звонки за этот день для ответственного
				const dayCalls = state.calls.filter(
					(c) =>
						c.responsible === newCall.responsible &&
						isSameDay(parseISO(c.date), callDateTime)
				)

				// 3. Проверка на пятницу
				if (isFriday(callDateTime) && dayCalls.length >= 2) {
					errors.push('В пятницу можно назначить только 2 звонка')
				}

				// 4. Проверка на срочный звонок в этот день
				if (dayCalls.some((c) => c.priority === 'Срочный')) {
					errors.push('Нельзя добавлять звонки, если уже есть срочный')
				}

				// 5. Проверка на последовательность типов
				if (
					dayCalls.length > 0 &&
					dayCalls[dayCalls.length - 1].type === newCall.type
				) {
					errors.push('Нельзя ставить два звонка одного типа подряд')
				}

				// 6. Если больше 4 звонков - пометить как срочный
				if (dayCalls.length >= 4) {
					newCall.priority = 'Срочный'
				}

				if (errors.length > 0) {
					state.error = errors.join('; ')
					return
				}

				state.calls.unshift(action.payload)
				state.error = null
			},
			prepare(callData: Omit<Call, 'id'>) {
				return {
					payload: {
						...callData,
						id: Date.now().toString(),
					},
				}
			},
		},
		removeCall: (state, action: PayloadAction<string>) => {
			state.calls = state.calls.filter((call) => call.id !== action.payload)
			state.error = null
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
				// При изменении даты/времени проверяем правила
				if (
					action.payload.field === 'date' ||
					action.payload.field === 'time'
				) {
					const updatedCall = {
						...call,
						[action.payload.field]: action.payload.value,
					}
					const callDateTime = parseISO(updatedCall.date)

					// Повторяем проверки
					const errors: string[] = []
					const callTime = callDateTime.getHours()

					if ([12, 13, 14].includes(callTime)) {
						errors.push(
							'Нельзя назначать звонки в обеденное время (12:00-14:00)'
						)
					}

					const dayCalls = state.calls
						.filter((c) => c.id !== updatedCall.id) // исключаем текущий звонок
						.filter(
							(c) =>
								c.responsible === updatedCall.responsible &&
								isSameDay(parseISO(c.date), callDateTime)
						)

					if (isFriday(callDateTime) && dayCalls.length >= 2) {
						errors.push('В пятницу можно назначить только 2 звонка')
					}

					if (dayCalls.some((c) => c.priority === 'Срочный')) {
						errors.push('Нельзя изменять звонки, если уже есть срочный')
					}

					if (
						dayCalls.length > 0 &&
						dayCalls[dayCalls.length - 1].type === updatedCall.type
					) {
						errors.push('Нельзя ставить два звонка одного типа подряд')
					}

					if (dayCalls.length >= 4) {
						updatedCall.priority = 'Срочный'
					}

					if (errors.length > 0) {
						state.error = errors.join('; ')
						return
					}

					// Если проверки пройдены, применяем изменения
					call[action.payload.field] = action.payload.value
					call.priority = updatedCall.priority
				} else {
					// Для других полей просто обновляем
					call[action.payload.field] = action.payload.value
				}
			}
			state.error = null
		},
	},
})

export const { addCall, removeCall, setCalls, updateCallField } =
	callsSlice.actions
export default callsSlice.reducer
