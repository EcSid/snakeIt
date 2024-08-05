import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { cordsAreEqual } from '../../helpers/cordsAreEqual'
import { cellHeight, cellWidth } from '../../constants/constants'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { snakeArrSlice } from '../../store/reducers/snakeArrSlice'

import { snakeProps } from '../../types/propses/snakeProps'
import { gameStatusSlice } from '../../store/reducers/gameStatusSlice'
import { snake2ArrSlice } from '../../store/reducers/snake2ArrSlice'

const SnakeOne: FC<snakeProps> = ({ clearIntervals, gameForOne }) => {
	const [wasMoving, setWasMoving] = useState<boolean>(false)

	const refToVerticalInterval = useRef<number | undefined>()
	const refToHorizontalInterval = useRef<number | undefined>()

	const { snakeArr, direction, isFreeze, hasExtraSpeed } = useTypedSelector(
		state => state.snakeArr
	)
	const { setGameStatus } = gameStatusSlice.actions
	const {
		addNewRemoveFirst,
		setDirection,
		changeFreeze: changeFreezeSnake1,
	} = snakeArrSlice.actions
	const { increaseWins: increaseWinsSnake2, changeFreeze: changeFreezeSnake2 } =
		snake2ArrSlice.actions
	const dispatch = useDispatch()

	const onKeyDown = useCallback(
		(e: Event) => {
			const event = e as KeyboardEvent

			if (event.code === 'ArrowDown') {
				if (refToVerticalInterval.current) return
				if (refToHorizontalInterval) {
					clearInterval(refToHorizontalInterval.current)
					refToHorizontalInterval.current = undefined
				}

				setWasMoving(true)
				dispatch(setDirection('down'))
				const setArrWithSnakes = () => dispatch(addNewRemoveFirst('down'))
				setArrWithSnakes()
				refToVerticalInterval.current = setInterval(
					() => {
						setArrWithSnakes()
					},
					hasExtraSpeed ? 80 : 130
				)
			}
			if (event.code === 'ArrowUp' && wasMoving) {
				if (refToVerticalInterval.current) return
				if (refToHorizontalInterval) {
					clearInterval(refToHorizontalInterval.current)
					refToHorizontalInterval.current = undefined
				}
				dispatch(setDirection('up'))
				const setArrWithSnakes = () => dispatch(addNewRemoveFirst('up'))
				setArrWithSnakes()
				refToVerticalInterval.current = setInterval(
					() => {
						setArrWithSnakes()
					},
					hasExtraSpeed ? 80 : 130
				)
			} else if (event.code === 'ArrowLeft' && wasMoving) {
				if (refToHorizontalInterval.current) return
				if (refToVerticalInterval) {
					clearInterval(refToVerticalInterval.current)
					refToVerticalInterval.current = undefined
				}
				dispatch(setDirection('left'))
				const setArrWithSnakes = () => dispatch(addNewRemoveFirst('left'))
				setArrWithSnakes()
				refToHorizontalInterval.current = setInterval(
					() => {
						setArrWithSnakes()
					},
					hasExtraSpeed ? 80 : 130
				)
			} else if (event.code === 'ArrowRight' && wasMoving) {
				if (refToHorizontalInterval.current) return
				if (refToVerticalInterval) {
					clearInterval(refToVerticalInterval.current)
					refToVerticalInterval.current = undefined
				}
				dispatch(setDirection('right'))
				const setArrWithSnakes = () => dispatch(addNewRemoveFirst('right'))
				setArrWithSnakes()
				refToHorizontalInterval.current = setInterval(
					() => {
						setArrWithSnakes()
					},
					hasExtraSpeed ? 80 : 130
				)
			}
		},
		[wasMoving, snakeArr, hasExtraSpeed]
	)

	useEffect(() => {
		if (isFreeze) {
			window.removeEventListener('keydown', onKeyDown)
			clearInterval(refToVerticalInterval.current)
			clearInterval(refToHorizontalInterval.current)
		} else {
			window.addEventListener('keydown', onKeyDown)
		}

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [wasMoving, snakeArr, isFreeze, hasExtraSpeed])

	//checkOnLosing

	useEffect(() => {
		let isLosing = false
		snakeArr.map((_, index) => {
			if (index === snakeArr.length - 1 || index === snakeArr.length - 2) return
			if (
				cordsAreEqual(
					document.getElementById('snakeOne' + String(index)),
					document.getElementById('snakeOne' + String(snakeArr.length - 1))
				)
			)
				isLosing = true
		})

		const isLosing2 =
			snakeArr[snakeArr.length - 1][0] <= (gameForOne ? -3 : 0) ||
			snakeArr[snakeArr.length - 1][0] >= (gameForOne ? 97 : 100) ||
			snakeArr[snakeArr.length - 1][1] <= 0 ||
			snakeArr[snakeArr.length - 1][1] >= 90.785

		if (snakeArr[snakeArr.length - 1][1] >= 90.785) {
			snakeArr[snakeArr.length - 1]
			document
				.getElementById('snakeOne' + String(snakeArr.length - 1))
				?.classList.add('minimumZIndex')
		}
		if (isLosing || isLosing2) {
			dispatch(changeFreezeSnake1())
			dispatch(changeFreezeSnake2())
			if (!gameForOne) {
				dispatch(increaseWinsSnake2())
			}
			dispatch(
				setGameStatus({
					status: 'end',
					message: gameForOne ? 'Ты проиграл' : 'Синий выиграл',
				})
			)
		}
	}, [snakeArr])

	useEffect(() => {
		if (clearIntervals) {
			clearInterval(refToVerticalInterval.current)
			clearInterval(refToHorizontalInterval.current)
		}
	}, [clearIntervals])

	return (
		<>
			{snakeArr.map((el, index) => {
				const xPosition = gameForOne ? el[0] + cellWidth : el[0]
				const yPosition = Math.round(el[1] / cellHeight) * cellHeight + 0.16

				return (
					<div
						className={
							index === snakeArr.length - 1
								? `snake1Head snake1${
										direction.charAt(0).toUpperCase() + direction.slice(1)
								  }`
								: 'snake1Body'
						}
						style={{
							left: xPosition + 'vw',
							top: yPosition + '%',
						}}
						id={'snakeOne' + String(index)}
						key={index + 1}
					>
						{index === snakeArr.length - 1 ? (
							<div
								className={`font${
									direction.charAt(0).toUpperCase() + direction.slice(1)
								}Snake1`}
							>
								. .
							</div>
						) : undefined}
					</div>
				)
			})}
		</>
	)
}

export default SnakeOne
