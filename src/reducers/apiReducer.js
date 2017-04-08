import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function layoutReducer(state = initialState.api, action) {

    switch(action.type) {

        case types.SET_EVENTS:
            return Object.assign({}, state, { events: action.events });

        case types.SET_PAGE_LOAD:
            return Object.assign({}, state, { pageDidLoad: action.value });

        default:
            return state;
    }

}
