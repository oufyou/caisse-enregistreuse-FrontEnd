import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

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
