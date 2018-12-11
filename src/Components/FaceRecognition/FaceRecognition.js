import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
	return (
		<div className='center'>
			<img 
				src={imageUrl}
				id='inputimage'
				alt='Face-will-be-here'
			/>
		</div>
	);
}

export default FaceRecognition;
