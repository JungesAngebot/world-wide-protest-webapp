import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as apiActions from 'actions/apiActions';

class HomePage extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}

	render() {
		let event = this.props.api.currentEvent;
		return (
			<div>
				<div id="detail-header" style={{ backgroundImage: `url(${require("../../styles/img/event-placeholder.jpg")})` }}>
					<div className="text-gradient">
						<h1>{event.title}</h1>
					</div>
				</div>
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

export function loadDetailPage(nextState, store, next) {
	store.dispatch(apiActions.setPageLoad(false));
	store.dispatch(apiActions.getEventById(nextState.params.id))
	.then(response => {
		store.dispatch(apiActions.setEvent(response.data));
		store.dispatch(apiActions.setPageLoad(true));
		next();
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);