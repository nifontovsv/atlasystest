export type Call = {
	id: string
	date: string
	time: string
	responsible: string
	type: 'Входящий' | 'Исходящий'
	priority: 'Обычный' | 'Срочный'
}

export interface CallState {
	calls: Call[]
	error: string | null
}
