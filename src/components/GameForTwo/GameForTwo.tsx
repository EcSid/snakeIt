import { useEffect, useState } from 'react'
import Apple from '../Apple/Apple'
import Header from '../Header/Header'
import SnakeOne from '../SnakeOne/SnakeOne'
import SnakeTwo from '../SnakeTwo/SnakeTwo'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { cordsAreEqual } from '../../helpers/cordsAreEqual'
import Modal from '../Modal/Modal'
import { useDispatch } from 'react-redux'
import { snakeArrSlice } from '../../store/reducers/snakeArrSlice'
import { snake2ArrSlice } from '../../store/reducers/snake2ArrSlice'
import { gameStatusSlice } from '../../store/reducers/gameStatusSlice'
import SpeedApple from '../SpeedApple/SpeedApple'
import background from '/public/backgroundBlack.jpg'

const GameForTwo = () => {
	const { snakeArr: snake1Arr } = useTypedSelector(state => state.snakeArr)
	const { snakeArr: snake2Arr } = useTypedSelector(state => state.snake2Arr)
	const { increaseWins: increaseWinsSnake1 } = snakeArrSlice.actions
	const { increaseWins: increaseWinsSnake2 } = snake2ArrSlice.actions
	const { status, message, countOfAppleSnake1, countOfAppleSnake2 } =
		useTypedSelector(state => state.gameStatus)
	const [clearIntervals, setClearIntervals] = useState<boolean>(false)
	const { setGameStatus } = gameStatusSlice.actions
	const { changeFreeze: changeFreezeSnake1 } = snakeArrSlice.actions

	const { changeFreeze: changeFreezeSnake2 } = snake2ArrSlice.actions
	const dispatch = useDispatch()

	useEffect(() => {
		let snakeOneIntoSnakeTwo = false
		snake2Arr.forEach((_, index) => {
			if (
				cordsAreEqual(
					document.getElementById('snakeOne' + String(snake1Arr.length - 1)),
					document.getElementById('snakeTwo' + String(index))
				)
			) {
				snakeOneIntoSnakeTwo = true
			}
		})

		let snakeTwoIntoSnakeOne = false
		snake1Arr.forEach((_, index) => {
			if (
				cordsAreEqual(
					document.getElementById('snakeTwo' + String(snake2Arr.length - 1)),
					document.getElementById('snakeOne' + String(index))
				)
			) {
				snakeTwoIntoSnakeOne = true
			}
		})

		if (
			cordsAreEqual(
				document.getElementById('snakeTwo' + String(snake2Arr.length - 1)),
				document.getElementById('snakeOne' + String(snake1Arr.length - 1))
			)
		) {
			setClearIntervals(true)
			dispatch(changeFreezeSnake1())
			dispatch(changeFreezeSnake2())
			dispatch(setGameStatus({ message: 'Никто не выиграл', status: 'end' }))
		} else if (snakeOneIntoSnakeTwo) {
			setClearIntervals(true)
			dispatch(increaseWinsSnake2())
			dispatch(changeFreezeSnake1())
			dispatch(changeFreezeSnake2())
			dispatch(setGameStatus({ message: 'Синий выиграл', status: 'end' }))
		} else if (snakeTwoIntoSnakeOne) {
			setClearIntervals(true)
			dispatch(increaseWinsSnake1())
			dispatch(changeFreezeSnake1())
			dispatch(changeFreezeSnake2())
			dispatch(setGameStatus({ message: 'Красный выиграл', status: 'end' }))
		}
	}, [snake1Arr, snake2Arr])

	return (
		<>
			<Header gameForOne={false} />
			<div className='divAboveBackground'>
				<img className='background' src={background} />
				<Apple gameForOne={false} />
				<SpeedApple gameForOne={false} />
				<SnakeOne clearIntervals={clearIntervals} gameForOne={false} />
				<SnakeTwo clearIntervals={clearIntervals} gameForOne={false} />
			</div>
			<div className='greyPolygon'></div>
			{status === 'end' && (
				<Modal
					message={message}
					appleCount={countOfAppleSnake1}
					appleCount2={countOfAppleSnake2}
				/>
			)}
		</>
	)
}

export default GameForTwo
