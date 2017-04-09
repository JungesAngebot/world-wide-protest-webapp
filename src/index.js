import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import * as firebase from 'firebase';
import * as apiActions from 'actions/apiActions';
import moment from 'moment';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import configureStore from 'store/configureStore';
import routes from 'routes';
import config from 'config';
import 'styles/icomoon.css';
import 'styles/styles.less';

const store = configureStore();
firebase.initializeApp(config.firebase);

// TODO: Dynamisch und so 'n Stuff.
moment.locale("de");

Promise.all([
	store.dispatch(apiActions.getEvents())
]).then(values => {
		let events = values[0].data;
		store.dispatch(apiActions.setEvents(events));
		store.dispatch(apiActions.setPageLoad(true));
	});

render(
	<LocaleProvider locale={enUS}>
		<Provider store={store}>
			<Router history={browserHistory} routes={routes(store)} />
		</Provider>
	</LocaleProvider>, document.getElementById("app")
);
