import { useTypedSelector } from '../../hooks/useTypedSelector'
import Apple from '../Apple/Apple'
import Header from '../Header/Header'
import Modal from '../Modal/Modal'
import SnakeOne from '../SnakeOne/SnakeOne'
import SpeedApple from '../SpeedApple/SpeedApple'
import background from '/public/backgroundBlack.jpg'

const GameForOne = () => {
	const { status, message, countOfAppleSnake1 } = useTypedSelector(
		state => state.gameStatus
	)

	return (
		<>
			<Header gameForOne={true} />
			<div className='divAboveBackground'>
				<img className='background' src={background} />
				<Apple gameForOne={true} />
				<SpeedApple gameForOne={true} />
				<SnakeOne gameForOne={true} />
			</div>
			<div className='greyPolygon'></div>
			{status === 'end' && (
				<Modal message={message} appleCount={countOfAppleSnake1} />
			)}
		</>
	)
}

export default GameForOne
