import { useState } from 'react'

type Props = {
	children: React.ReactNode
}

export const ClickableBlock = ({ children }: Props) => {
	const [isClicking, setIsClicking] = useState(false)

	const handleMouseDown = () => {
		requestAnimationFrame(() => {
			setIsClicking(true)
		})
	}

	const resetClick = () => {
		setIsClicking(false)
	}

	return (
		<div
			className={`cursor-hover ${isClicking ? 'cursor-click' : ''}`}
			onMouseDown={handleMouseDown}
			onMouseUp={resetClick}
			onMouseLeave={resetClick}
		>
			{children}
		</div>
	)
}
