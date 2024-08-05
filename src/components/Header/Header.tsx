import { FC } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import './Header.css'
import homeIcon from '/public/home-icon.svg'
import { Link } from 'react-router-dom'

interface HeaderProps {
	gameForOne: boolean
}

const Header: FC<HeaderProps> = ({ gameForOne }) => {
	const { countOfAppleSnake1, countOfAppleSnake2 } = useTypedSelector(
		state => state.gameStatus
	)

	const clickHandler = () => {
		setTimeout(() => window.location.reload(), 100)
	}

	return (
		<header className='header'>
			{gameForOne ? (
				<div className='countOfAppleSnake'>
					Получено очков: {countOfAppleSnake1}
				</div>
			) : (
				<>
					<div>
						<div className='red'>
							Очков у первой змейки: {countOfAppleSnake1}
						</div>
						<div className='blue'>
							Очков у второй змейки: {countOfAppleSnake2}
						</div>
					</div>
				</>
			)}
			<Link to='/chooseGame'>
				<img src={homeIcon} className='homeIcon' onClick={clickHandler} />
			</Link>
		</header>
	)
}

export default Header
