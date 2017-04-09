import React from 'react';

const Hero = () => {

	return (
		<section id="hero">
			<section className="hero-content">
				<div className="inner">
					<h1>Find, create and share protests. Wherever you are.</h1>
					<button type="button" className="btn btn-block">
						<a href="#overview-map" style={{ color: "white" }}>
							Search in <span className="locater">Mainz</span>
						</a>
					</button>
				</div>
			</section>
		</section>
	);

}

export default Hero;