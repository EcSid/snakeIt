import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { snakeArrSlice } from './reducers/snakeArrSlice'
import { appleCordsSlice } from './reducers/appleCordsSlice'
import { snake2ArrSlice } from './reducers/snake2ArrSlice'
import { gameStatusSlice } from './reducers/gameStatusSlice'
import { speedAppleCordsSlice } from './reducers/speedAppleCordsSlice'

const rootReducer = combineReducers({
	snakeArr: snakeArrSlice.reducer,
	snake2Arr: snake2ArrSlice.reducer,
	appleCords: appleCordsSlice.reducer,
	speedAppleCords: speedAppleCordsSlice.reducer,
	gameStatus: gameStatusSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type IRootReducer = ReturnType<typeof rootReducer>
