import axios from 'axios';
import { API_URL } from './consts';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const ROLE_SESSION_ATTRIBUTE_NAME = 'role';

class AuthenticationService {
  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/basicauth`, {
      headers: { Authorization: this.createBasicAuthToken(username, password) }
    });
  }

  executeJwtAuthenticationService(username, password) {
    console.log(username);
    return axios.post(`${API_URL}/auth/`, {
      username: username,
      password: password
    });
  }

  createBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
    //console.log('registerSuccessfulLogin')
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
  }

  registerSuccessfulLoginForJwt(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createJWTToken(token));
  }
  checkLogin() {
    axios.interceptors.request.use(config => {
      if (this.isUserLoggedIn()) {
        config.headers.Authorization =
          'Bearer ' + window.localStorage.getItem('accessToken');
      }
      return config;
    });
  }
  createJWTToken(token) {
    return 'Bearer ' + token;
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }
  getLoggedInUserId() {
    let user = sessionStorage.getItem('user');
    if (user === null) return '';
    return JSON.parse(user).id;
  }
  getLoggedInRoles() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')).roles;
    } else {
      return '';
    }
  }
  setupAxiosInterceptors(token) {
    axios.interceptors.request.use(config => {
      if (this.isUserLoggedIn()) {
        config.headers.Authorization = token;
      }
      return config;
    });
  }
}

export default new AuthenticationService();
