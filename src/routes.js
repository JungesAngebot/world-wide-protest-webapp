import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import HomePage from 'components/home/HomePage';
import DetailPage, { loadDetailPage } from 'components/detail/DetailPage';
import LoginPage from 'components/login/LoginPage';

import config from 'config';

export default (store) => (
	<Route path={config.baseName} component={App}>
		<IndexRoute component={HomePage} />
		<Route path="/login" component={LoginPage} />
		<Route path="/event/:id" component={DetailPage} onEnter={(nextState, replace, next) => loadDetailPage(nextState, store, next)} />
	</Route>
);
