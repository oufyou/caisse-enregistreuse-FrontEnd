import axios from 'axios';
import { API_URL } from './consts';

class SubCategoriesService {
  getSubCategories() {
    return axios.get(API_URL + '/SubCategories');
  }
  updateSubCategory(subCategory) {
    return axios.put(API_URL + '/SubCategories', subCategory);
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
  removeSubCategory(id) {
    return axios.delete(API_URL + '/SubCategories/' + id);
  }
}
export default new SubCategoriesService();
