import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'
import { Link } from 'react-router-dom'

interface ModalProps {
	message: string | null
	appleCount: number
	appleCount2?: number
}

const Modal: FC<ModalProps> = ({ message, appleCount, appleCount2 }) => {
	const ref = useRef<HTMLDialogElement>(null)
	const [open, setOpen] = useState<boolean>(false)
	const record = localStorage.getItem('record')
	const snake1Wins = localStorage.getItem('snake1Wins')
	const snake2Wins = localStorage.getItem('snake2Wins')

	const clickHandlerChooseGame = () => {
		setTimeout(() => window.location.reload(), 100)
	}
	const clickHandlerReloadWins = () => {
		localStorage.setItem('snake1Wins', '0')
		localStorage.setItem('snake2Wins', '0')
	}

	useEffect(() => {
		if (message) {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}, [message])

	useEffect(() => {
		if (open) {
			ref.current?.showModal()
		} else {
			ref.current?.close()
		}
	}, [open])

	return createPortal(
		<dialog
			className={message === 'Ты проиграл' ? 'dialogWhenOne' : 'dialogWhenTwo'}
			ref={ref}
		>
			<p className='message'>
				{message === 'Синий выиграл' ? (
					<span className='blue'>{message}</span>
				) : message === 'Никто не выиграл' ? (
					<span className='black'>{message}</span>
				) : (
					<span className='red'>{message}</span>
				)}
			</p>
			<li className='appleCount'>
				{message === 'Ты проиграл' ? (
					<span className='black'>
						Получено очков: <span className='red'>{appleCount}</span>
					</span>
				) : (
					<span className='red'>
						Побед у первой змейки:{' '}
						<span className='red'>{snake1Wins ? Number(snake1Wins) : 0}</span>
					</span>
				)}
			</li>
			{Number(appleCount2) >= 0 ? (
				<li className='appleCount2'>
					<span className='blue'>Побед у второй змейки: </span>
					<span className='blue'>{snake2Wins ? Number(snake2Wins) : 0}</span>
				</li>
			) : (
				<li className='yourRecord'>
					<span className='black'>Твой рекорд: </span>
					<span className='red'>{record ? record : undefined}</span>
				</li>
			)}
			<button
				className={
					message === 'Ты проиграл' ? 'playAgainWhenOne' : 'playAgainWhenTwo'
				}
				onClick={() => {
					//todo
					window.location.reload()
				}}
			>
				Сыграть заново
			</button>
			{message !== 'Ты проиграл' ? (
				<>
					<Link to='/gameForOne'>
						<span
							className='linkToReloadWins'
							tabIndex={2}
							onClick={clickHandlerReloadWins}
						>
							Обнулить победы
						</span>
					</Link>

					<Link to='/chooseGame'>
						<span
							className='linkToChooseGameWhenTwo'
							onClick={clickHandlerChooseGame}
						>
							Выйти в меню
						</span>
					</Link>
				</>
			) : (
				<Link to='/chooseGame'>
					<span
						className='linkToChooseGameWhenTwo'
						onClick={clickHandlerChooseGame}
					>
						Выйти в меню
					</span>
				</Link>
			)}
		</dialog>,
		document.getElementById('modal') as HTMLElement
	)
}

export default Modal
