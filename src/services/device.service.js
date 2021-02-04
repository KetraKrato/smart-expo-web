import {apiConstants} from '../_constants'
import  axios from "axios" 
export const deviceService = {
    getAlldevice,
    
    
};

 
axios.defaults.withCredentials = true;



function getAlldevice() {
    return axios.get( `${apiConstants.uri}/api/event`,
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