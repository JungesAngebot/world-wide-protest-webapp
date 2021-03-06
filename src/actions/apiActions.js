import * as types from './actionTypes';
import axios from 'axios';
import config from '../config';

var hostName;

/* if(process.env.NODE_ENV === "production") {
    hostName = "https://wwpserver.azurewebsites.net/worldwideprotest/api"
} else { 
    hostName = "http://localhost:8080/worldwideprotest/api";
} */

hostName = "https://wwpserver.azurewebsites.net/worldwideprotest/api";

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

export function getEventById(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {

            axios.get(hostName + "/events/" + id)
            .catch(error => {
                // handle error
            })
            .then(response => {
                resolve(response);
            });

        });
    }
}

export function addEvent(event) {
    return dispatch => {
        return new Promise((resolve, reject) => {

            axios.post(hostName + "/events/add", event, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })
            .catch(error => {
                console.log(error);
                console.log(error.response);
            })
            .then(response => {
                console.log("API ADD EVENT ACTION");
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

export function setEvent(event) {
    return {
        type: types.SET_EVENT,
        event
    };
}

export function setPageLoad(value) {
    return {
        type: types.SET_PAGE_LOAD,
        value
    };
}