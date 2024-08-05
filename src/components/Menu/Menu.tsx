import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
	return (
		<>
			<div className='backgroundInMenu'>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Link to='/chooseGame'>
				<button className='playButton'>Играть в змейку</button>
			</Link>
		</>
	)
}

export default Menu
