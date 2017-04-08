import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import * as apiActions from 'actions/apiActions';
import LoadingSpinner from 'components/common/LoadingSpinner';

class App extends React.Component {

	render() {
		return (
			<div id="main">
				<ReactCSSTransitionGroup
					transitionName="loading"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{this.props.api.pageDidLoad ? null : <LoadingSpinner />}
				</ReactCSSTransitionGroup>
				{this.props.children}
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
        actions: bindActionCreators(apiActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
