import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	x: -1000,
	y: -1000,
}

interface IPayload {
	x: number
	y: number
}

export const speedAppleCordsSlice = createSlice({
	name: 'speedAppleCords',
	initialState,
	reducers: {
		setNewSpeedAppleCords(state, action: PayloadAction<IPayload>) {
			state.x = action.payload.x
			state.y = action.payload.y
		},
	},
})
