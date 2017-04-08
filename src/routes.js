import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from "components/App";
import HomePage from "components/home/HomePage";
import config from 'config';

export default (
	<Route path={config.baseName} component={App}>
		<IndexRoute component={HomePage} />
	</Route>
);
