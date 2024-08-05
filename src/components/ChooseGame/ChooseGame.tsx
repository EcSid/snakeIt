import { Link } from 'react-router-dom'
import './ChooseGame.css'

const ChooseGame = () => {
	return (
		<>
			<div className='greyPolygon'></div>
			<p className='chooseGameText'>Выберите режим</p>
			<div className='parentOfModes'>
				<Link to='/gameForOne'>
					<div className='onePlayerMode'>
						<p className='countOfPlayers'>1 игрок</p>
						<img src='/man.png' className='image' />
					</div>
				</Link>
				<Link to='/gameForTwo'>
					<div className='twoPlayerMode'>
						<p className='countOfPlayers'>2 игрока</p>
						<img src='/man.png' className='image' />
						<img src='/man.png' className='image' />
					</div>
				</Link>
			</div>
			<a className='starToGithub' href='https://github.com/EcSid/snakeIt'>
				Поставить проекту звезду на github
			</a>
		</>
	)
}

export default ChooseGame
