import axios from 'axios';
import { API_URL } from './consts';

class CategoriesService {
  getCategories() {
    return axios.get(API_URL + '/Categories');
  }
  updateCategory(category) {
    return axios.put(API_URL + '/Categories', category);
  }
  createCategorie(nom, desc, display = true) {
    return axios.post(API_URL + '/Categories', {
      nom: nom,
      description: desc,
      display: display
    });
  }

  removeCategorie(id) {
    return axios.delete(API_URL + '/Categories/' + id);
  }
}
export default new CategoriesService();
