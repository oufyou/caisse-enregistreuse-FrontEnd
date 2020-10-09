import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class CategoriesService {
  returnCategories(categories) {
    this.categories = categories;
  }
  getCategories() {
    return axios.get(API_URL + '/Categories', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
}
export default new CategoriesService();
