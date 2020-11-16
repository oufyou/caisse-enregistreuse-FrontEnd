import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from './consts';

class CategoriesService {
  getCustomers() {
    return axios.get(API_URL + '/Customers');
  }
  createCustomer(
    firstName,
    lastName,
    sexe,
    bdate,
    adress,
    phone,
    email,
    username,
    password,
    updatedBy,
    createdBy,
    code = uuidv4().substring(0, 7),
    role = ['customer', 'user']
  ) {
    return axios.post(API_URL + '/auth/signup', {
      firstName,
      lastName,
      sexe,
      bdate,
      adress,
      phone,
      email,
      username,
      password,
      updatedBy,
      createdBy,
      code,
      role
    });
  }

  removeCustomer(id) {
    return axios.delete(API_URL + '/Users/' + id);
  }
}
export default new CategoriesService();
