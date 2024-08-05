export const cordsAreEqual = (
	el1: HTMLElement | null,
	el2: HTMLElement | null
) => {
	if (!el1 || !el2) return
	const el1Cords = el1?.getBoundingClientRect()
	const el2Cords = el2?.getBoundingClientRect()
	if (!el1Cords || !el2Cords) return
	return (
		el1Cords.top + el1Cords.height > el2Cords.top &&
		el1Cords.left + el1Cords.width > el2Cords.left &&
		el1Cords.bottom - el1Cords.height < el2Cords.bottom &&
		el1Cords.right - el1Cords.width < el2Cords.right
	)
}
