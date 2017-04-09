import React, { Component } from 'react';

class LoginPage extends Component {

	render() {

		return (
			<div className="grid-container">

				<div className="inner">
					<section id="login">

						<form className="login-form">
							<span className="input-label-wrapper">
							<input id="input-user-mail" className="filter-input" type="text" name="user-mail" placeholder="Your mail" />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
							</span>

							<span className="input-label-wrapper">
							<input id="input-user-password" className="filter-input" type="text" name="user-password" placeholder="Your password" />
							<label className="filter-label" for="input-user-password">
								<span className="icon icon-password"></span>
							</label>
							</span>
						</form>
						<hr className="divider" />
						<span className="input-label-wrapper">
							<button className="btn-login btn-facebook" type="button" name="facebook-login">Sign in with Facebook</button>
						</span>
						<span className="input-label-wrapper">
							<img src="http://192.168.204.251:8887/img/btn_google_signin_light_normal_web.png" alt="sign in with google" />
						</span>
						
					</section>
				</div>

			</div>
		);

	}

}

export default LoginPage;