import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import lightning from './lightning.png';

const Logo = () => {
	return (
		<div className='background mh4 mt3'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 180, width: 150 }} >
			 	<div className="Tilt-inner pt3"> 
			 		<img src={lightning} alt='logo'/> 
			 	</div>
			</Tilt>
		</div>
	);
}

export default Logo;
