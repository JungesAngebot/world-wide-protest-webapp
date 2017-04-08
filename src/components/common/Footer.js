import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Footer = () => {

	return (
		<footer id="keel">
			<div className="inner">
				<div id="keel-nav">
					<ul>
						<li><a href="/imprint">Imprint</a></li>
						<li><a href="/legal">Legal</a></li>
					</ul>
				</div>
				<div id="social-nav">
					<ul>
						<li><a href="https://www.facebook.com/wwprotest" target="_blank" title="world wide protest on facebook"><span className="icon icon-facebook"></span></a></li>
						<li><a href="https://twitter.com/wwprotest" target="_blank" title="world wide protest on twitter"><span className="icon icon-twitter"></span></a></li>
					</ul>
				</div>
			</div>
		</footer>
	);

};

Footer.propTypes = {
	// test: PropTypes.bool.isRequired
};

export default Footer;
