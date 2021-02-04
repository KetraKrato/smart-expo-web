import {apiConstants} from '../_constants'
import  axios from "axios" 
export const programService = {
    runscrcpy
    
};

 
// axios.defaults.withCredentials = true;



function runscrcpy() {
    return axios.get( `${apiConstants.uriProgram}`,
     { headers: { 'Content-Type': 'application/json', } },
    // { withCredentials: true }
    ).then((data)=>{
        console.log(data)
    })
        // .then(device => {
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     // return device;
        // })
        // .catch((e)=>{
        //     if(e.response.status === 400) {
        //         e.message = e.response.data
        //         return Promise.reject(e);
        //     }
        //     if(e.response.status === 401) {
        //             window.location.reload(true)
        //     }
        //     // window.location.reload(true)
        // })
}







