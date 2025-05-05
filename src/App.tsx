import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { RiDeleteBinLine } from 'react-icons/ri'
import { ClickableBlock } from './common/ClickableBlock'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCall, removeCall } from './redux/reducers/callsReducer'

function App() {
	const dispatch = useDispatch()
	const calls = useSelector((state) => state.calls.calls)

	const handleAdd = () => {
		dispatch(
			addCall({
				id: 1,
				date: '10-02-25',
				time: '10:30',
				responsible: 'Иванов И.И.',
				type: 'Входящий',
				priority: 'Срочный',
			})
		)
	}

	const handleRemove = (id: number) => {
		dispatch(removeCall(id))
	}

	const [btnDelete, setBtnDelete] = useState(false)
	const [startDate, setStartDate] = useState(new Date())
	const [inputShow, setInputShow] = useState(false)
	const handleChange = (date: Date | null) => {
		if (date) {
			setStartDate(date)
		}
	}
	const editInputClick = () => {
		setInputShow(false)
	}
	return (
		<div className='h-fit'>
			<div className='grid grid-cols-4 justify-items-center'>
				<span>Дата и время</span>
				<span>Ответственные</span>
				<span>Тип звонка</span>
				<span>Важность</span>
			</div>
			<div className='min-h-full bg-[#1F232F] rounded-[40px] m-6 py-6 flex flex-col gap-5'>
				<ClickableBlock>
					<div className='flex justify-center py-[24px] mx-6 border border-dashed border-white rounded-full hover:bg-[#303c56] select-none'>
						<a onClick={handleAdd} className='' href=''>
							Добавить событие
						</a>
					</div>
				</ClickableBlock>
				{calls.map((call) => {
					;<ClickableBlock key={call.id}>
						<div className='mx-6 relative'>
							<div className='group grid grid-cols-4 items-center hover:bg-regal-blue-hover  bg-regal-blue rounded-full py-4 px-12'>
								<div className='w-fit h-fit py-3 px-6 hover:bg-green-hover hover:rounded-full flex flex-col items-center'>
									{inputShow ? (
										<input type='number' />
									) : (
										<p onClick={editInputClick} className='text-4xl'>
											12:39
										</p>
									)}

									<DatePicker
										selected={startDate}
										onChange={handleChange}
										dateFormat='dd.MM.yyyy'
										className=' rounded-lg w-30 text-[16px] text-[rgba(255,255,255,0.8)] pl-4'
									/>
								</div>
								<div className=' h-fit py-2 px-4 border border-solid flex justify-self-center width-input border-[rgba(255,255,255,0.4)] rounded-full text-[14px] text-[rgba(255,255,255,0.6)]'>
									Фамилия Имя участника
								</div>
								<div className='width-calls h-fit flex justify-center items-center gap-2 justify-self-end bg-blue-light hover:bg-blue-light-hover text-[14px] text-black py-1 px-4 rounded-full'>
									Исходящий
									<IoIosArrowDown />
								</div>
								<div className='w-fit h-fit flex items-center justify-self-end gap-2 bg-white-20 hover:bg-white-20-hover text-[14px] text-white py-1 px-4 rounded-full'>
									Обычный
									<IoIosArrowDown />
								</div>
								<div
									onClick={() => handleRemove(call.id)}
									className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-red flex justify-center items-center'
								>
									<RiDeleteBinLine className='w-5 h-5' />
								</div>
							</div>
						</div>
					</ClickableBlock>
				})}
				<ClickableBlock>
					<div className='mx-6 relative'>
						<div className='group grid grid-cols-4 items-center hover:bg-green-base-hover bg-green-base rounded-full py-4 px-12'>
							<div className='w-fit h-fit py-3 px-6 hover:bg-green-hover hover:rounded-full flex flex-col items-center'>
								<p className='text-4xl'>12:39</p>
								<DatePicker
									selected={startDate}
									onChange={handleChange}
									dateFormat='dd.MM.yyyy'
									className=' rounded-lg w-30 text-[16px] text-[rgba(255,255,255,0.8)] pl-4'
								/>
							</div>
							<div className='width-input justify-self-center h-fit py-2 px-4 border border-solid border-[rgba(255,255,255,0.4)] rounded-full text-[14px] text-[rgba(255,255,255,0.6)]'>
								Фамилия Имя участника
							</div>
							<div className='width-calls h-fit flex items-center gap-2 justify-center justify-self-end bg-blue-light hover:bg-blue-light-hover text-[14px] text-black py-1 px-4 rounded-full'>
								Входящий
								<IoIosArrowDown />
							</div>
							<div className='w-fit h-fit flex items-center justify-self-end gap-2 bg-regal-red hover:bg-regal-red-hover text-[14px] text-white py-1 px-4 rounded-full'>
								Срочный
								<IoIosArrowDown />
							</div>
							<div className='absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200  w-9 h-9 rounded-full bg-red flex justify-center items-center'>
								<RiDeleteBinLine className='w-5 h-5' />
							</div>
						</div>
					</div>
				</ClickableBlock>
			</div>
		</div>
	)
}

export default App
