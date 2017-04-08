import * as types from './actionTypes';
import axios from 'axios';
import config from '../config';

var hostName;

if(process.env.NODE_ENV === "production") {
    hostName = "http://wwpserver.azurewebsites.net/worldwideprotest/api"
} else { 
    hostName = "http://localhost:8080/worldwideprotest/api";
}

console.log(hostName);

/* export function fetchExampleFromUrl(exampleUrl) {
    return {
        type: types.EXAMPLE,
        url: exampleUrl
    };
} */

/**
 * Holt nach dem Firebase-Login den dazugehörigen JWT Token
 * @param {*} uid 
 */
export function getJWT(uid) {
    return dispatch => {
        return new Promise((resolve, reject) => {

            axios.post(hostName + "/login", { uid })
            .catch(error => {
                reject(error);
            })
            .then(response => {
                let token = response.data.token;
                localStorage.setItem("token", token);
                resolve(token);
            })

        });
    }
}

/**
 * Gibt alle Veransaltungen zurück
 */
export function getEvents() {
    return dispatch => {
        return new Promise((resolve, reject) => {

            axios.get(hostName + "/events")
            .catch(error => {
                // no auth
            })
            .then(response => {
                resolve(response);
            });

        });
    }
}

export function setEvents(events) {
    return {
        type: types.SET_EVENTS,
        events
    };
}

export function setPageLoad(value) {
    return {
        type: types.SET_PAGE_LOAD,
        value
    };
}