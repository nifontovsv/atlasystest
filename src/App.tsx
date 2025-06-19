import { useEffect } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { ClickableBlock } from './common/ClickableBlock'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import {
	addCall,
	removeCall,
	setCalls,
	updateCallField,
} from './redux/reducers/callsReducer'
import { useAppDispatch, useAppSelector } from './redux/store/store'
import { v4 as uuidv4 } from 'uuid'
import { Call } from './redux/reducers/callsReducer'
import DropDown from './common/DropDown'
import InputName from './common/InputName'

function App() {
	const dispatch = useAppDispatch()
	const calls = useAppSelector((state) => state.calls.calls)
	const error = useAppSelector((state) => state.calls.error)

	useEffect(() => {
		const savedCalls = localStorage.getItem('calls')
		if (savedCalls) {
			dispatch(setCalls(JSON.parse(savedCalls)))
		} else {
			fetch('/calls.json')
				.then((res) => res.json())
				.then((data) => {
					const dataCalls = data.map((call: any) => ({
						...call,
						id: uuidv4(),
					}))
					dispatch(setCalls(dataCalls))
				})
				.catch(console.error)
		}
	}, [])

	useEffect(() => {
		if (calls.length > 0) {
			localStorage.setItem('calls', JSON.stringify(calls))
		}
	}, [calls])

	const handleAdd = () => {
		const now = new Date()
		dispatch(
			addCall({
				date: now.toISOString(),
				time: format(now, 'HH:mm'),
				responsible: 'Фамилия Имя участника',
				type: 'Исходящий',
				priority: 'Обычный',
			})
		)
	}

	const handleRemove = (id: string) => {
		dispatch(removeCall(id))
	}

	return (
		<div className='h-fit'>
			{error && (
				<div className='fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md z-50'>
					{error}
				</div>
			)}
			<div className='grid grid-cols-4 justify-items-center'>
				<span>Дата и время</span>
				<span>Ответственные</span>
				<span>Тип звонка</span>
				<span>Важность</span>
			</div>
			<div className='min-h-full bg-[#1F232F] rounded-[40px] m-6 py-6 flex flex-col gap-5'>
				<ClickableBlock>
					<div
						onClick={handleAdd}
						className='flex justify-center py-[24px] mx-6 border border-dashed border-white rounded-full hover:bg-[#303c56] select-none'
					>
						Добавить событие
					</div>
				</ClickableBlock>
				{calls.map((call, index) => (
					<ClickableBlock key={index}>
						<div className='mx-6 relative'>
							<div className='group grid grid-cols-4 items-center hover:bg-regal-blue-hover  bg-regal-blue rounded-full py-4 px-12 select-none'>
								<div className='w-fit h-fit py-3 px-6 hover:bg-green-hover hover:rounded-full flex flex-col items-center'>
									<p className='text-4xl'>
										{format(new Date(call.date), 'HH:mm')}
									</p>
									<DatePicker
										selected={new Date(call.date)}
										onChange={(date) => {
											if (date) {
												dispatch(
													updateCallField({
														id: call.id,
														field: 'date',
														value: date.toISOString(),
													})
												)
											}
										}}
										showTimeSelect
										timeFormat='HH:mm'
										timeIntervals={15}
										dateFormat='yyyy-MM-dd'
										className='rounded-lg w-30 text-[16px] text-[rgba(255,255,255,0.8)] pl-4'
										placeholderText='Выберите дату и время'
									/>
								</div>
								<InputName id={call.id} responsible={call.responsible} />
								<DropDown<Call['type']>
									id={call.id}
									options={['Исходящий', 'Входящий']}
									initial={call.type}
									field='type'
								/>
								<DropDown<Call['priority']>
									id={call.id}
									options={['Обычный', 'Срочный']}
									initial={call.priority}
									field='priority'
								/>
								<div
									onClick={() => handleRemove(call.id)}
									className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-red flex justify-center items-center'
								>
									<RiDeleteBinLine className='w-5 h-5' />
								</div>
							</div>
						</div>
					</ClickableBlock>
				))}
			</div>
		</div>
	)
}

export default App
