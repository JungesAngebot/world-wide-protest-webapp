import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

import * as apiActions from 'actions/apiActions';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import EventItem from 'components/common/EventItem';

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

	render() {
		return (
			<div>
				<Header />

				<div className="grid-container">
					<div className="row no-margin" style={{ marginTop: "1rem" }}>

						{this.props.api.events.length > 0 && this.props.api.events.map(event => {
							return (
								<EventItem key={event.id} event={event} />
							)
						})}

					</div>
				</div>
			
				<Footer />
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
