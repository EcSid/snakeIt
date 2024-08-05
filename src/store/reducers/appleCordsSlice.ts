import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cellHeight, cellWidth } from '../../constants/constants'
import { initialSnake1Cords } from '../../constants/initialSnakeCords'

const initialState = {
	x: initialSnake1Cords[0] + 0.3 + cellWidth,
	y: initialSnake1Cords[1] + cellHeight * 9 + 0.3,
}

interface IPayload {
	x: number
	y: number
}

export const appleCordsSlice = createSlice({
	name: 'appleCords',
	initialState,
	reducers: {
		setNewAppleCords(state, action: PayloadAction<IPayload>) {
			state.x = action.payload.x
			state.y = action.payload.y
		},
		// setDefaultApple() {
		// 	return {
		// 		x: initialSnake1Cords[0] + 0.3 + cellWidth,
		// 		y: initialSnake1Cords[1] + cellHeight * 9 + 0.3,
		// 	}
		// },
	},
})
