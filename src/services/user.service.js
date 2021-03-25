import { authHeader } from "../helpers";
import { apiConstants } from "../_constants";
import axios from "axios";
export const userService = {
  login,
  logout,
  register,
  verify,
  getAllUser,
  getDetailaUser,
  postAddmember,
  allGroup,
  addGroup,
};

axios.defaults.withCredentials = true;

function login(username, password) {
  const data = JSON.stringify({ username, password });
  return axios
    .post(
      `${apiConstants.uri}/api/signin`,
      data,
      { headers: { "Content-Type": "application/json", crossDomain: true } },
      { withCredentials: true }
    )
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    })
    .catch((e) => {
      if (e.response.status === 400) {
        e.message = e.response.data;
        return Promise.reject(e);
      }
      if (e.response.status === 401) {
        window.location.reload(true);
      }
      // window.location.reload(true)
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${apiConstants.uri}/users/register`, requestOptions);
}

function verify() {
  return axios
    .post(
      `${apiConstants.uri}/api/verify`,
      { headers: { "Content-Type": "application/json", crossDomain: true } },
      { withCredentials: true }
    )
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log(user);
      return user;
    })
    .catch((e) => {
      if (e.response.status === 400) {
        e.message = e.response.data;
        return Promise.reject(e);
      }
      if (e.response.status === 401) {
        window.location.reload(true);
      }
      // window.location.reload(true)
    });
}

function getAllUser() {
  return axios
    .get(
      `${apiConstants.uri}/api/manyMember`,
      { headers: { "Content-Type": "application/json", crossDomain: true } },
      { withCredentials: true }
    )
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return user;
    })
    .catch((e) => {
      if (e.response.status === 400) {
        e.message = e.response.data;
        return Promise.reject(e);
      }
      if (e.response.status === 401) {
        window.location.reload(true);
      }
      // window.location.reload(true)
    });
}

function getDetailaUser(id) {
  return axios
    .get(
      `${apiConstants.uri}/api/memberId?id=${id}`, // edit API
      { headers: { "Content-Type": "application/json", crossDomain: true } },
      { withCredentials: true }
    )
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log(user);
      return user;
    })
    .catch((e) => {
      if (e.response.status === 400) {
        e.message = e.response.data;
        return Promise.reject(e);
      }
      if (e.response.status === 401) {
        window.location.reload(true);
      }
      // window.location.reload(true)
    });
}

function postAddmember(d) {
  const data = d;
  return axios
    .post(
      `${apiConstants.uri}/api/member`, // edit API
      data,
      { headers: { "Content-Type": "application/json", crossDomain: true } },
      { withCredentials: true }
    )
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log(user);
      return user;
    })
    .catch((e) => {
      if (e.response.status === 400) {
        e.message = e.response.data;
        return Promise.reject(e);
      }
      if (e.response.status === 401) {
        window.location.reload(true);
      }
      // window.location.reload(true)
    });
}

function allGroup() {
  return axios
    .get(
      `${apiConstants.uri}/api/group`, // edit API
      { headers: { "Content-Type": "application/json", crossDomain: true } },
      { withCredentials: true }
    )
    .then((group) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log("check allGroup");
      return group;
    })
    .catch((e) => {
      if (e.response.status === 400) {
        e.message = e.response.data;
        return Promise.reject(e);
      }
      if (e.response.status === 401) {
        window.location.reload(true);
      }
      // window.location.reload(true)
    });
}

function addGroup(name, type, colors) {
  const data = JSON.stringify({ name, type, colors });
  return axios
    .post(
      `${apiConstants.uri}/api/group`,
      data,
      { headers: { "Content-Type": "application/json", crossDomain: true } },
      { withCredentials: true }
    )
    .then((user) => {
      console.log("user_service");
      console.log(user);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      //localStorage.setItem('user', JSON.stringify(user));
      //alert("Add Success")

      return user;
    })
    .catch((e) => {
      console.log(e);
      alert("Add Fail");
      // if(e.response.status === 400) {
      //     alert("Add Fail")
      // }
      // if(e.response.status === 401) {
      //         window.location.reload(true)
      // }
      // window.location.reload(true)
    });
}
