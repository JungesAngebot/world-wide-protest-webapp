import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import logo from '../../styles/img/logo_white.png';

const Header = () => {

	return (
		<div>
			<nav>
				<img src={logo} alt="World Wide Protest" id="logo" />
				<ul>
					<li><Link to="/" activeClassName="activeLink">Home</Link></li>
					<li><Link to="/" activeClassName="activeLink">Home</Link></li>
					<li><Link to="/" activeClassName="activeLink">Home</Link></li>
					<li><Link to="/" activeClassName="activeLink">Home</Link></li>
				</ul>
			</nav>
			<header></header>
		</div>
	);

};

Header.propTypes = {
	// test: PropTypes.bool.isRequired
};

export default Header;
