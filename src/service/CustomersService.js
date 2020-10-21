import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:8080/api';

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
    role = ['user']
  ) {
    return axios.post(API_URL + '/Customers', {
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
    return axios.delete(API_URL + '/Customers/' + id);
  }
}
export default new CategoriesService();
