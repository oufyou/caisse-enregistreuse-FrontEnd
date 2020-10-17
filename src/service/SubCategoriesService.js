import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class SubCategoriesService {
  getSubCategories() {
    return axios.get(API_URL + '/SubCategories');
  }
  getAllByCategory(id) {
    return axios.get(API_URL + '/SubCategories/category=' + id);
  }
  createSubCategorie(nom, desc, category) {
    return axios.post(API_URL + '/SubCategories', {
      nom: nom,
      description: desc,
      imagelink: '',
      category_id: category
    });
  }
  removeSubCategorie(id) {
    return axios.delete(API_URL + '/SubCategories/' + id);
  }
}
export default new SubCategoriesService();
