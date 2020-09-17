import axios from "axios";
export const apiService = {
  signUp,
  detection
};

 function signUp(data) {

    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/upload/register',data)
          .then(function (response) {
            resolve(response.data)

          })
          .catch(function (error) {
            reject(error)
          });
    
    // console.log(images,maxNumberOfCandidates)
        })
}


 function detection() {
    
    return new Promise((resolve, reject) => {
        axios.get('http://161.246.5.201:3000/detection')
          .then(function (response) {
            resolve(response.result)
          })
          .catch(function (error) {
            reject(error)
          });
    
    // console.log(images,maxNumberOfCandidates)
        })
}
