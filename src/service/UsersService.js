import axios from 'axios';
import { API_URL } from './consts';

class UsersService {
  getUsers() {
    return axios.get(API_URL + '/users');
  }
  updateUser(user) {
    return axios.put(API_URL + '/users', user);
  }

  removeUser(id) {
    return axios.delete(API_URL + '/users/' + id);
  }
}
export default new UsersService();
