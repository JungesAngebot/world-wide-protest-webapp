import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

import * as apiActions from 'actions/apiActions';
import EventItem from 'components/common/EventItem';

class EventList extends Component {

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
	}

	render() {
		return (
			<div>
				

				<div className="grid-container">
					<div className="row no-margin" style={{ marginTop: "1rem" }}>

						{this.props.api.events.length > 0 && this.props.api.events.map(event => {
							return (
								<EventItem key={event.id} event={event} />
							)
						})}

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

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
