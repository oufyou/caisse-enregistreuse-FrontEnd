import axios from 'axios';
import { API_URL } from './consts';

class CategoriesService {
  getCategories() {
    return axios.get(API_URL + '/Categories');
  }
  createCategorie(nom, desc) {
    return axios.post(API_URL + '/Categories', { nom: nom, description: desc });
  }

  removeCategorie(id) {
    return axios.delete(API_URL + '/Categories/' + id);
  }
}
export default new CategoriesService();
