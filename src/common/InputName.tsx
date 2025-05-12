import React, { useEffect, useRef, useState } from 'react'
import { updateCallField } from '../redux/reducers/callsReducer'
import { useAppDispatch } from '../redux/store/store'

type InputNameProps = {
	id: string
	responsible?: string
}

function InputName({
	id,
	responsible = 'Фамилия Имя участника',
}: InputNameProps) {
	const [value, setValue] = useState<string>(responsible)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const dispatch = useAppDispatch()

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (/\d/.test(e.key)) {
			e.preventDefault()
		}
		if (e.key === 'Enter') {
			setIsEdit(false)
		}
	}

	useEffect(() => {
		if (isEdit && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEdit])

	return (
		<div>
			{isEdit ? (
				<input
					ref={inputRef}
					onBlur={() => setIsEdit(false)}
					className='h-fit py-2 px-4 border border-solid flex justify-self-center width-input border-[rgba(255,255,255,0.4)] rounded-full text-[14px] text-[rgba(255,255,255,0.6)]'
					type='text'
					value={value}
					onChange={(e) => {
						setValue(e.target.value)
						dispatch(
							updateCallField({
								id: id,
								field: 'responsible',
								value: e.target.value,
							})
						)
					}}
					onKeyDown={handleKeyDown}
					placeholder='Фамилия Имя участника'
				/>
			) : (
				<p
					onClick={() => setIsEdit(true)}
					// className='border border-solid border-[rgba(255,255,255,0.4)] w-fit rounded-full px-4 pt-1 pb-1.5 bg-[rgba(255,255,255,0.04)] text-sm whitespace-nowrap'
					className='h-fit py-2 px-4 border border-solid flex justify-self-center width-input border-[rgba(255,255,255,0.4)] rounded-full text-[14px] text-[rgba(255,255,255,0.6)]'
				>
					{value}
				</p>
			)}
		</div>
	)
}

export default InputName
