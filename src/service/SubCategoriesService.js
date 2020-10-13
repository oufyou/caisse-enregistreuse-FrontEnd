import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class SubCategoriesService {
  getSubCategories() {
    return axios.get(API_URL + '/SubCategories', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
  getAllByCategory(id) {
    return axios.get(API_URL + '/SubCategories/category=' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
  createSubCategorie(nom, desc, category) {
    return axios.post(
      API_URL + '/SubCategories',
      { nom: nom, description: desc, imagelink: '', category_id: category },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );
  }
  removeSubCategorie(id) {
    return axios.delete(API_URL + '/SubCategories/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
}
export default new SubCategoriesService();
