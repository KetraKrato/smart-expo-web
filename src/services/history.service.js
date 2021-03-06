import {apiConstants} from '../_constants'
import  axios from "axios" 
export const historyService = {
    getHistory,
    getConcludeHistory
    ,getConcludeLocations
    ,getDeviceConcludion
};

 
axios.defaults.withCredentials = true;

function getHistory() {
    return axios.get( `${apiConstants.uri}/api/history`,
     { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
    { withCredentials: true }
    )
        .then(device => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return device;
        })
        .catch((e)=>{
            if(e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if(e.response.status === 401) {
                    window.location.reload(true)
            }
            // window.location.reload(true)
        })
}

function getConcludeHistory() {
    return axios.get( `${apiConstants.uri}/api/history/conclude`,
     { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
    { withCredentials: true }
    )
        .then(device => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return device;
        })
        .catch((e)=>{
            if(e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if(e.response.status === 401) {
                    window.location.reload(true)
            }
            // window.location.reload(true)
        })
}

function getConcludeLocations() {
    return axios.get( `${apiConstants.uri}/api/event/locations/report`,
     { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
    { withCredentials: true }
    )
        .then(device => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return device;
        })
        .catch((e)=>{
            if(e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if(e.response.status === 401) {
                    window.location.reload(true)
            }
            // window.location.reload(true)
        })
}




function getDeviceConcludion(id) {
    return axios.get( `${apiConstants.uri}/api/history/conclude/devices?id=`+id,
     { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
    { withCredentials: true }
    )
        .then(device => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return device;
        })
        .catch((e)=>{
            if(e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if(e.response.status === 401) {
                    window.location.reload(true)
            }
            // window.location.reload(true)
        })
}










