import { cellHeight, cellWidth } from '../constants/constants'

export function randomCellsForTwo(
	snake1Arr: number[][],
	snake2ArrOrAppleCords: number[][]
) {
	const filledCellsX: number[] = []
	const filledCellsY: number[] = []
	snake1Arr.forEach(el => {
		filledCellsX.push(Math.ceil(el[0] / cellWidth))
		filledCellsY.push(Math.floor(el[1] / cellHeight))
	})
	snake2ArrOrAppleCords.forEach(el => {
		filledCellsX.push(Math.ceil(el[0] / cellWidth))
		filledCellsY.push(Math.floor(el[1] / cellHeight))
	})

	let notFilledCellsX: number[] = []

	let notFilledCellsY: number[] = []

	for (let i = 0; i <= 56; i++) {
		if (!filledCellsX.includes(i)) notFilledCellsX.push(i)
	}

	for (let y = 0; y <= 24; y++) {
		if (!filledCellsY.includes(y)) notFilledCellsY.push(y)
	}

	notFilledCellsX = [...new Set(notFilledCellsX)]
	notFilledCellsY = [...new Set(notFilledCellsY)]

	notFilledCellsX.sort((a, b) => a - b)
	notFilledCellsY.sort((a, b) => a - b)

	const randomXCell =
		notFilledCellsX[Math.floor(Math.random() * notFilledCellsX.length - 1)]
	const randomYCell =
		notFilledCellsY[Math.floor(Math.random() * notFilledCellsY.length - 1)]

	return [randomXCell, randomYCell]
}
