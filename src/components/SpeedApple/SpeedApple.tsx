import './SpeedApple.css'
import { FC, useEffect } from 'react'
import { cordsAreEqual } from '../../helpers/cordsAreEqual'
import { cellHeight, cellWidth } from '../../constants/constants'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { snakeArrSlice } from '../../store/reducers/snakeArrSlice'
import { useDispatch } from 'react-redux'
import { snake2ArrSlice } from '../../store/reducers/snake2ArrSlice'
import { randomCellsForTwo } from '../../helpers/randomCellsForTwo'
import { randomCellsForThree } from '../../helpers/randomCellsForThree'
import { speedAppleCordsSlice } from '../../store/reducers/speedAppleCordsSlice'

interface speedAppleProps {
	gameForOne: boolean
}

const SpeedApple: FC<speedAppleProps> = ({ gameForOne }) => {
	const { snakeArr: snake1Arr } = useTypedSelector(state => state.snakeArr)
	const { snakeArr: snake2Arr } = useTypedSelector(state => state.snake2Arr)
	const { x: appleX, y: appleY } = useTypedSelector(state => state.appleCords)
	const { x: speedAppleX, y: speedAppleY } = useTypedSelector(
		state => state.speedAppleCords
	)

	const dispatch = useDispatch()

	const { setNewSpeedAppleCords } = speedAppleCordsSlice.actions
	const { toggleExtraSpeed: toogleExtraSpeedSnake1 } = snakeArrSlice.actions
	const { toggleExtraSpeed: toogleExtraSpeedSnake2 } = snake2ArrSlice.actions

	useEffect(() => {
		setTimeout(
			() =>
				dispatch(
					setNewSpeedAppleCords({
						x: Math.floor(Math.random() * 56) * cellWidth + 0.5,
						y: Math.floor(Math.random() * 24) * cellHeight + 0.55,
					})
				),
			Math.floor((Math.random() * (14 - 10) + 10) * 1000)
		)
	}, [])

	useEffect(() => {
		if (
			cordsAreEqual(
				document.querySelector('.speedApple'),
				document.getElementById('snakeOne' + String(snake1Arr.length - 1))
			)
		) {
			dispatch(toogleExtraSpeedSnake1())
			setTimeout(() => dispatch(toogleExtraSpeedSnake1()), 7000)
			if (gameForOne) {
				const [randomXCell, randomYCell] = randomCellsForTwo(snake1Arr, [
					[appleX, appleY],
				])
				document.querySelector('.speedApple')?.classList.add('displayNone')

				setTimeout(() => {
					document.querySelector('.speedApple')?.classList.remove('displayNone')
					dispatch(
						setNewSpeedAppleCords({
							x: randomXCell * cellWidth + 0.5,
							y: randomYCell * cellHeight + 0.55,
						})
					)
				}, Math.floor((Math.random() * (19 - 15) + 15) * 1000))
			} else {
				const [randomXCell, randomYCell] = randomCellsForThree(
					snake1Arr,
					snake2Arr,
					[[appleX, appleY]]
				)
				document.querySelector('.speedApple')?.classList.add('displayNone')

				setTimeout(() => {
					document.querySelector('.speedApple')?.classList.remove('displayNone')
					dispatch(
						setNewSpeedAppleCords({
							x: randomXCell * cellWidth + 0.5,
							y: randomYCell * cellHeight + 0.55,
						})
					)
				}, Math.floor((Math.random() * (25 - 18) + 18) * 1000))
			}
		}
	}, [snake1Arr])

	useEffect(() => {
		if (
			cordsAreEqual(
				document.querySelector('.speedApple'),
				document.getElementById('snakeTwo' + String(snake2Arr.length - 1))
			)
		) {
			dispatch(toogleExtraSpeedSnake2())
			setTimeout(() => dispatch(toogleExtraSpeedSnake2()), 7000)
			const [randomXCell, randomYCell] = randomCellsForThree(
				snake1Arr,
				snake2Arr,
				[[appleX, appleY]]
			)
			document.querySelector('.speedApple')?.classList.add('displayNone')

			setTimeout(() => {
				document.querySelector('.speedApple')?.classList.remove('displayNone')
				dispatch(
					setNewSpeedAppleCords({
						x: randomXCell * cellWidth + 0.35,
						y: randomYCell * cellHeight + 0.55,
					})
				)
			}, Math.floor((Math.random() * (19 - 15) + 15) * 1000))
		}
	}, [snake2Arr, appleX, appleY])

	return (
		<>
			<div
				className='speedApple'
				style={{
					left: speedAppleX + 'vw',
					top: speedAppleY + '%',
				}}
			/>
		</>
	)
}

export default SpeedApple
