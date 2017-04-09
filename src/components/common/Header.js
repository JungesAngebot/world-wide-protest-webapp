import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import update from 'react-addons-update';
import classnames from 'classnames';
import { Motion, spring } from 'react-motion';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import logo from '../../styles/img/logo_white.png';
import logoMobile from '../../styles/img/logo.png';
import * as apiActions from 'actions/apiActions';

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			windowSize: 0,
			navToggled: false
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.loginWithGoogle = this.loginWithGoogle.bind(this);
	}

	componentWillMount() {
		this.setState(prev => update(prev, {
			windowSize: { $set: window.innerWidth }
		}));
	}

	componentDidMount() {
		// add resize handler
	}

	resizeNav(size) {

	}

	toggleNav() {
		this.setState(prev => update(prev, {
			navToggled: { $set: !this.state.navToggled }
		}));
	}

	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider();
		let that = this;

		firebase.auth().signInWithPopup(provider)
		.catch(error => {

		})
		.then(result => {
			let token = result.credential.accessToken;
			let user = result.user;

			that.props.apiActions.getJWT(user.uid).then(token => {

				this.toggleNav();
			
			});
		});
	}

	render() {
		let user = firebase.auth().currentUser;
		if(this.state.windowSize > 800) {
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
					<header id="header-bg"></header>
				</div>
			)
		} else {
			return (
				<div className={classnames({
					"nav-active": this.state.navToggled
				})}>
					<nav>
						<img src={logoMobile} alt="World Wide Protest" id="logo" />
						<button style={{ marginTop: "3px" }} onClick={this.toggleNav} id="toggle-nav" className="hamburger hamburger--spin" type="button">
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						</button>
						<Motion style={{ h: spring(this.state.navToggled ? (!user ? 74 * 3 + 25 : 74 * 2 + 25)  : 0) }}>
							{value => {
								return (
									<ul style={{ height: value.h, overflow: "hidden" }}>
										<li><Link to="/" activeClassName="activeLink">Home</Link></li>
										<li><Link to="/" activeClassName="activeLink">About Us</Link></li>
										<li><Link to="/" activeClassName="activeLink">Make A Change</Link></li>
										{!user ? <li><div className="login-button" onClick={this.loginWithGoogle}>Sign In Via Google</div></li> : null }
									</ul>
								)
							}}
						</Motion>
					</nav>
					<header id="header-bg"></header>
				</div>
			)
		}
	}

};

Header.propTypes = {
	// test: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps) {
	return {
		api: state.api
	};
}

function mapDispatchToProps(dispatch) {
    return {
        apiActions: bindActionCreators(apiActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);