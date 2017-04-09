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

import logoSvg from '../../styles/img/wwp-logo.svg';

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
						<img src={logoSvg} alt="World Wide Protest" id="logo" />
						<ul>
							<li><Link to="/" activeClassName="activeLink">Home</Link></li>
							<li><Link to="/about-us" activeClassName="activeLink">About Us</Link></li>
							<li><Link to="/make-a-change" activeClassName="activeLink">Make A Change</Link></li>
							{!user ? <li><div className="login-button" onClick={this.loginWithGoogle}>Sign In Via Google</div></li> : <b>Welcome back, {user.displayName}!</b> }
						</ul>
					</nav>
				</div>
			)
		} else {
			return (
				<div className={classnames({
					"nav-active": this.state.navToggled
				})}>
					<nav>
						<img src={logoSvg} alt="World Wide Protest" id="logo" />
						<button style={{ marginTop: "3px" }} onClick={this.toggleNav} id="toggle-nav" className="hamburger hamburger--spin" type="button">
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						</button>
						<Motion style={{ h: spring(this.state.navToggled ? (!user ? 74 * 3 + 15 : 74 * 3 + 15)  : 0) }}>
							{value => {
								return (
									<ul style={{ height: value.h, overflow: "hidden" }}>
										<li><Link to="/" activeClassName="activeLink">Home</Link></li>
										<li><Link to="/about-us" activeClassName="activeLink">About Us</Link></li>
										<li><Link to="/make-a-change" activeClassName="activeLink">Make A Change</Link></li>
										{!user ? <li><div className="login-button" onClick={this.loginWithGoogle}>Sign In Via Google</div></li> : <div className="user-login">Welcome back, <b>{user.displayName}</b>!</div> }
									</ul>
								)
							}}
						</Motion>
					</nav>
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