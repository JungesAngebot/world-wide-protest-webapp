import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

import * as apiActions from 'actions/apiActions';
import Header from 'components/common/Header';

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form: {
				username: "",
				password: ""
			}
		}
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.loginWithGoogle = this.loginWithGoogle.bind(this);
	}

	componentDidMount() {

	}

	handleFieldChange(e) {
		e.preventDefault();
		// let field = event.target.name;
		// let kundeState = Object.assign({}, this.state.kunde);
		// kundeState[field] = event.target.value;
		// this.checkFields(kundeState);
		// return this.setState({ kunde: kundeState });
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

				console.log(token);
				
				that.props.apiActions.getEvents(token)
				.then(response => {
					that.props.apiActions.setEvents(response.data);
				});
			
			});
		});
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<Header />
				Landing Page
				<div onClick={this.loginWithGoogle}>Login with Google</div>
				{this.props.api.events.length > 0 && this.props.api.events.map(event => {
					return (
						<div key={event.id}>
							{event.title}
							{event.description}
						</div>
					)
				})}
			</div>
		);

	}

}

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
