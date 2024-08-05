import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IActionPayload {
	status: 'process' | 'end'
	message: string | null
}

export interface IGameStatusState {
	status: 'process' | 'end'
	message: string | null
	countOfAppleSnake1: number
	countOfAppleSnake2: number
}

const initialState: IGameStatusState = {
	status: 'process',
	message: null,
	countOfAppleSnake1: 0,
	countOfAppleSnake2: 0,
}

export const gameStatusSlice = createSlice({
	name: 'gameStatus',
	initialState,
	reducers: {
		setGameStatus(state, action: PayloadAction<IActionPayload>) {
			state.status = action.payload.status
			state.message = action.payload.message
		},
		increaseAppleCountSnake1(
			state,
			action: PayloadAction<'gameForOne' | 'gameForTwo'>
		) {
			state.countOfAppleSnake1 = state.countOfAppleSnake1 + 1
			if (action.payload === 'gameForOne') {
				if (localStorage.getItem('record')) {
					if (Number(localStorage.getItem('record')) < state.countOfAppleSnake1)
						localStorage.setItem('record', String(state.countOfAppleSnake1))
				} else {
					localStorage.setItem('record', String(state.countOfAppleSnake1))
				}
			}
		},
		increaseAppleCountSnake2(state) {
			state.countOfAppleSnake2 = state.countOfAppleSnake2 + 1
		},
		// setDefaultGameStatus() {
		// 	return {
		// 		status: 'process',
		// 		message: null,
		// 		countOfAppleSnake1: 0,
		// 		countOfAppleSnake2: 0,
		// 	}
		// },
	},
})
