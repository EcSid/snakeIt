import './Apple.css'
import { FC, useEffect } from 'react'
import { cordsAreEqual } from '../../helpers/cordsAreEqual'
import { cellHeight, cellWidth } from '../../constants/constants'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { snakeArrSlice } from '../../store/reducers/snakeArrSlice'
import { useDispatch } from 'react-redux'
import { appleCordsSlice } from '../../store/reducers/appleCordsSlice'
import { snake2ArrSlice } from '../../store/reducers/snake2ArrSlice'
import { gameStatusSlice } from '../../store/reducers/gameStatusSlice'

import { randomCellsForTwo } from '../../helpers/randomCellsForTwo'
import { randomCellsForThree } from '../../helpers/randomCellsForThree'

interface appleProps {
	gameForOne: boolean
}

const Apple: FC<appleProps> = ({ gameForOne }) => {
	const { snakeArr: snake1Arr, direction: snake1Direction } = useTypedSelector(
		state => state.snakeArr
	)
	const { snakeArr: snake2Arr, direction: snake2Direction } = useTypedSelector(
		state => state.snake2Arr
	)
	const { x: speedAppleX, y: speedAppleY } = useTypedSelector(
		state => state.speedAppleCords
	)
	const { appleCords } = useTypedSelector(state => state)

	const dispatch = useDispatch()

	const { addNew: addNewSnake1 } = snakeArrSlice.actions
	const { addNew: addNewSnake2 } = snake2ArrSlice.actions
	const { increaseAppleCountSnake1, increaseAppleCountSnake2 } =
		gameStatusSlice.actions
	const { setNewAppleCords } = appleCordsSlice.actions

	useEffect(() => {
		if (
			cordsAreEqual(
				document.querySelector('.apple'),
				document.getElementById('snakeOne' + String(snake1Arr.length - 1))
			)
		) {
			switch (snake1Direction) {
				case 'down':
					dispatch(addNewSnake1('down'))
					break
				case 'up':
					dispatch(addNewSnake1('up'))
					break
				case 'left':
					dispatch(addNewSnake1('left'))
					break
				case 'right':
					dispatch(addNewSnake1('right'))
					break
			}
			gameForOne
				? dispatch(increaseAppleCountSnake1('gameForOne'))
				: dispatch(increaseAppleCountSnake1('gameForTwo'))

			if (gameForOne) {
				const [randomXCell, randomYCell] = randomCellsForTwo(snake1Arr, [
					[speedAppleX, speedAppleY],
				])
				dispatch(
					setNewAppleCords({
						x: randomXCell * cellWidth + 0.5,
						y: randomYCell * cellHeight + 0.55,
					})
				)
			} else {
				const [randomXCell, randomYCell] = randomCellsForTwo(
					snake1Arr,
					snake2Arr
				)
				dispatch(
					setNewAppleCords({
						x: randomXCell * cellWidth + 0.5,
						y: randomYCell * cellHeight + 0.55,
					})
				)
			}
		}
	}, [snake1Arr])

	useEffect(() => {
		if (
			cordsAreEqual(
				document.querySelector('.apple'),
				document.getElementById('snakeTwo' + String(snake2Arr.length - 1))
			)
		) {
			switch (snake2Direction) {
				case 'down':
					dispatch(addNewSnake2('down'))
					break
				case 'up':
					dispatch(addNewSnake2('up'))
					break
				case 'left':
					dispatch(addNewSnake2('left'))
					break
				case 'right':
					dispatch(addNewSnake2('right'))
					break
			}
			dispatch(increaseAppleCountSnake2())
			const [randomXCell, randomYCell] = randomCellsForThree(
				snake1Arr,
				snake2Arr,
				[[speedAppleX, speedAppleY]]
			)
			dispatch(
				setNewAppleCords({
					x: randomXCell * cellWidth + 0.5,
					y: randomYCell * cellHeight + 0.55,
				})
			)
		}
	}, [snake2Arr])

	return (
		<>
			<div
				className='apple'
				style={{
					left: appleCords.x + 'vw',
					top: appleCords.y + '%',
				}}
			/>
		</>
	)
}

export default Apple
