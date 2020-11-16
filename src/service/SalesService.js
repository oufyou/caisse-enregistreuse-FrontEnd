import axios from 'axios';
import { API_URL } from './consts';

class SalesService {
  getSales() {
    return axios.get(API_URL + '/Sales');
  }
  createSale(sale) {
    return axios.post(API_URL + '/Sales', sale);
  }

  removeSale(id) {
    return axios.delete(API_URL + '/Sales/' + id);
  }
}
export default new SalesService();
