import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { cordsAreEqual } from '../../helpers/cordsAreEqual'
import { cellHeight } from '../../constants/constants'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'

import { snake2ArrSlice } from '../../store/reducers/snake2ArrSlice'

import { snakeProps } from '../../types/propses/snakeProps'
import { gameStatusSlice } from '../../store/reducers/gameStatusSlice'
import { snakeArrSlice } from '../../store/reducers/snakeArrSlice'

const SnakeTwo: FC<snakeProps> = ({ clearIntervals }) => {
	const [wasMoving, setWasMoving] = useState<boolean>(false)

	const refToVerticalInterval = useRef<number | undefined>()
	const refToHorizontalInterval = useRef<number | undefined>()

	const { snakeArr, direction, isFreeze, hasExtraSpeed } = useTypedSelector(
		state => state.snake2Arr
	)
	const { setGameStatus } = gameStatusSlice.actions
	const {
		addNewRemoveFirst,
		setDirection,
		changeFreeze: changeFreezeSnake2,
	} = snake2ArrSlice.actions

	const { increaseWins: increaseWinsSnake1, changeFreeze: changeFreezeSnake1 } =
		snakeArrSlice.actions
	const dispatch = useDispatch()

	const onKeyDown = useCallback(
		(e: Event) => {
			const event = e as KeyboardEvent
			if (event.code === 'KeyS') {
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
			if (event.code === 'KeyW' && wasMoving) {
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
			} else if (event.code === 'KeyA' && wasMoving) {
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
			} else if (event.code === 'KeyD' && wasMoving) {
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
					document.getElementById('snakeTwo' + String(index)),
					document.getElementById('snakeTwo' + String(snakeArr.length - 1))
				)
			)
				isLosing = true
		})

		const isLosing2 =
			snakeArr[snakeArr.length - 1][0] <= 0 ||
			snakeArr[snakeArr.length - 1][0] >= 100 ||
			snakeArr[snakeArr.length - 1][1] <= 0 ||
			snakeArr[snakeArr.length - 1][1] >= 90.785

		if (snakeArr[snakeArr.length - 1][1] >= 90.785) {
			snakeArr[snakeArr.length - 1]
			document
				.getElementById('snakeTwo' + String(snakeArr.length - 1))
				?.classList.add('minimumZIndex')
		}
		if (isLosing || isLosing2) {
			dispatch(changeFreezeSnake1())
			dispatch(changeFreezeSnake2())
			dispatch(increaseWinsSnake1())
			dispatch(
				setGameStatus({
					status: 'end',
					message: 'Красный выиграл',
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
				const yPosition = Math.round(el[1] / cellHeight) * cellHeight + 0.16

				return (
					<div
						className={
							index === snakeArr.length - 1
								? `snake2Head snake2${
										direction.charAt(0).toUpperCase() + direction.slice(1)
								  }`
								: 'snake2Body'
						}
						style={{
							left: el[0] + 'vw',
							top: yPosition + '%',
						}}
						id={'snakeTwo' + String(index)}
						key={index + 1}
					>
						{index === snakeArr.length - 1 ? (
							<div
								className={`font${
									direction.charAt(0).toUpperCase() + direction.slice(1)
								}Snake2`}
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

export default SnakeTwo
