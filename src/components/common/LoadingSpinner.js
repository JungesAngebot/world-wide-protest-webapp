import React from 'react';
import loadingAnimation from '../../styles/img/wwp_loading_animation.gif';

const LoadingSpinner = () => {

	return (
		<div className="loading">
			<div style={{ textAlign: "center" }}>
				<img id="gif-loading-animation" src={loadingAnimation} alt="" />
				<h2 style={{ marginTop: "0.5rem", fontWeight: "300", fontStyle: "italic" }}>Faster Internet. Now!</h2>
			</div>
		</div>
	);
	
};

export default LoadingSpinner;