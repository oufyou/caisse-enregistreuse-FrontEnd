import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class ProductsService {
  getProducts() {
    return axios.get(API_URL + '/Products', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
}
export default new ProductsService();
