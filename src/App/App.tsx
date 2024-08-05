import { Route, Routes } from 'react-router-dom'
import GameForTwo from '../components/GameForTwo/GameForTwo'
import Menu from '../components/Menu/Menu'
import ChooseGame from '../components/ChooseGame/ChooseGame'
import GameForOne from '../components/GameForOne/GameForOne'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Menu />} />
			<Route path='/chooseGame' element={<ChooseGame />} />
			<Route path='/gameForTwo' element={<GameForTwo />} />
			<Route path='/gameForOne' element={<GameForOne />} />
		</Routes>
	)
}

export default App
