import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialSnake1Cords } from '../../constants/initialSnakeCords'
import { cellHeight, cellWidth } from '../../constants/constants'

const initialState = {
	snakeArr: [
		[initialSnake1Cords[0], initialSnake1Cords[1] - cellHeight * 2],
		[initialSnake1Cords[0], initialSnake1Cords[1] - cellHeight],
		[...initialSnake1Cords],
	],
	direction: 'down',
	isFreeze: false,
	hasExtraSpeed: false,
}

export const snakeArrSlice = createSlice({
	name: 'snakeArr',
	initialState,
	reducers: {
		addNewRemoveFirst(
			state,
			action: PayloadAction<'up' | 'down' | 'left' | 'right'>
		) {
			const snakeArr = state.snakeArr
			const lastElem = snakeArr[snakeArr.length - 1]

			// const snakeArrWithRulesDown = snakeArr.map(el => [
			// 	el[0],
			// 	el[1] >= 89 - cellHeight ? el[1] - 93 : el[1],
			// ])
			// const lastElemDown =
			// 	snakeArrWithRulesDown[snakeArrWithRulesDown.length - 1]

			// const snakeArrWithRulesUp = snakeArr.map(el => [
			// 	el[0],
			// 	el[1] <= 0 + cellHeight ? 93 - Math.abs(el[1]) : el[1],
			// ])
			// const lastElemUp = snakeArrWithRulesUp[snakeArrWithRulesUp.length - 1]

			// const snakeArrWithRulesLeft = state.snakeArr.map(el => [
			// 	el[0] <= 0 + cellWidth ? 100 - Math.abs(el[0]) : el[0],
			// 	el[1],
			// ])
			// const lastElemLeft =
			// 	snakeArrWithRulesLeft[snakeArrWithRulesLeft.length - 1]

			// const snakeArrWithRulesRight = snakeArr.map(el => [
			// 	el[0] >= 100 - cellWidth ? el[0] - 100 : el[0],
			// 	el[1],
			// ])
			// const lastElemRight =
			// 	snakeArrWithRulesRight[snakeArrWithRulesRight.length - 1]

			switch (action.payload) {
				case 'down':
					state.snakeArr = snakeArr
						.slice(1)
						.concat([[lastElem[0], lastElem[1] + cellHeight]])
					break
				case 'up':
					state.snakeArr = snakeArr
						.slice(1)
						.concat([[lastElem[0], lastElem[1] - cellHeight]])
					break
				case 'left':
					state.snakeArr = snakeArr
						.slice(1)
						.concat([[lastElem[0] - cellWidth, lastElem[1]]])
					break
				case 'right':
					state.snakeArr = snakeArr
						.slice(1)
						.concat([[lastElem[0] + cellWidth, lastElem[1]]])
					break
			}
		},
		addNew(state, action: PayloadAction<'up' | 'down' | 'left' | 'right'>) {
			const snakeArr = state.snakeArr
			const lastElem = snakeArr[snakeArr.length - 1]
			switch (action.payload) {
				case 'down':
					state.snakeArr = snakeArr.concat([[lastElem[0], lastElem[1]]])
					break
				case 'up':
					state.snakeArr = snakeArr.concat([[lastElem[0], lastElem[1]]])
					break
				case 'left':
					state.snakeArr = snakeArr.concat([[lastElem[0], lastElem[1]]])
					break
				case 'right':
					state.snakeArr = snakeArr.concat([[lastElem[0], lastElem[1]]])
					break
			}
		},
		setDirection(
			state,
			action: PayloadAction<'up' | 'down' | 'left' | 'right'>
		) {
			return { ...state, direction: action.payload }
		},
		increaseWins() {
			if (localStorage.getItem('snake1Wins')) {
				localStorage.setItem(
					'snake1Wins',
					String(Number(localStorage.getItem('snake1Wins')) + 1)
				)
			} else {
				localStorage.setItem('snake1Wins', '1')
			}
		},
		changeFreeze(state) {
			state.isFreeze = !state.isFreeze
		},
		toggleExtraSpeed(state) {
			state.hasExtraSpeed = !state.hasExtraSpeed
		},
		// setDefaultSnake1ExceptWins(state) {
		// 	return {
		// 		snakeArr: [
		// 			[initialSnake1Cords[0], initialSnake1Cords[1] - cellHeight * 2],
		// 			[initialSnake1Cords[0], initialSnake1Cords[1] - cellHeight],
		// 			[...initialSnake1Cords],
		// 		],
		// 		direction: 'down',
		// 		wins: state.wins,
		// 		isFreeze: false,
		// 	}
		// },
	},
})
