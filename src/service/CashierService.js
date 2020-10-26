import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:8080/api';

class CashierService {
  getCashiers() {
    return axios.get(API_URL + '/Caissiers');
  }
  createCashier(
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
    role = ['cashier', 'user']
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

  removeCashier(id) {
    return axios.delete(API_URL + '/Users/' + id);
  }
}
export default new CashierService();
