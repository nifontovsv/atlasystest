import { IoIosArrowDown } from 'react-icons/io'

function App() {
	return (
		<div className='h-dvh'>
			<div className='grid grid-cols-4 justify-between'>
				<span>Дата и время</span>
				<span>Ответственные</span>
				<span>Тип звонка</span>
				<span>Важность</span>
			</div>
			<div className='min-h-full bg-[#1F232F] rounded-[40px] m-6 p-6 flex flex-col gap-5'>
				<div className='flex justify-center py-[24px] border border-dashed border-white rounded-full hover:bg-[#303c56] cursor-pointer'>
					<a className='' href=''>
						Добавить событие
					</a>
				</div>
				<div className='grid grid-cols-4 items-center hover:bg-regal-blue-hover  bg-regal-blue rounded-full py-4 px-12 cursor-pointer'>
					<div className=''>
						<p className='text-4xl'>12:39</p>
						<p className='text-[16px] text-[rgba(255,255,255,0.8)]'>
							12 окт. 2025
						</p>
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
				</div>
				<div className='grid grid-cols-4 items-center hover:bg-regal-blue-hover bg-regal-blue rounded-full py-4 px-12 cursor-pointer'>
					<div className='w-fit h-fit'>
						<p className='text-4xl'>12:39</p>
						<p className='text-[16px] text-[rgba(255,255,255,0.8)]'>
							12 окт. 2025
						</p>
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
				</div>
			</div>
		</div>
	)
}

export default App
