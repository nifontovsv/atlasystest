import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

type DropDownProps<T extends string> = {
	options: T[]
	initial: T
}
function DropDown<T extends string>({ options, initial }: DropDownProps<T>) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [select, setSelect] = useState<T>(initial)
	const dropDownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropDownRef.current &&
				!dropDownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const colorChange = (option: T): string => {
		switch (option) {
			case 'Входящий':
				return 'bg-green-light'
			case 'Исходящий':
				return 'bg-blue-light'
			case 'Обычный':
				return 'bg-white-20 text-white'
			case 'Срочный':
				return 'bg-regal-red text-white'
			default:
				return 'bg-blue-light'
		}
	}

	return (
		<div
			className={`relative width-calls h-fit flex justify-center items-center gap-2 justify-self-end text-[14px] text-black py-1 px-4 rounded-full select-none ${colorChange(
				select
			)}`}
			ref={dropDownRef}
			onClick={() => setIsOpen(!isOpen)}
		>
			<span className={`capitalize font-semibold`}>{select}</span>
			<IoIosArrowDown />
			{isOpen && (
				<div className='absolute w-fit top-8 mt-[15px] bg-[#2B3041] rounded-2xl p-2 whitespace-nowrap z-50'>
					<p className=' py-2 px-5 text-[14px] text-[rgba(255,255,255,0.8)]'>
						Выберете тип звонка
					</p>
					<ul>
						{options.map((option, index) => (
							<li
								className='hover:bg-green-hover duration-200 py-2 px-5'
								key={option}
								onClick={() => {
									setSelect(option)
									setIsOpen(false)
								}}
							>
								<span
									className={`py-1 px-4 rounded-full select-none w-fit capitalize font-semibold ${colorChange(
										option
									)}`}
								>
									{option}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default DropDown
