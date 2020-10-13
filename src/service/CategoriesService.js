import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class CategoriesService {
  getCategories() {
    return axios.get(API_URL + '/Categories', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
  createCategorie(nom, desc) {
    return axios.post(
      API_URL + '/Categories',
      { nom: nom, description: desc },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );
  }
  addSubCategorie(categorieId, subCategorieId) {
    return axios.patch(API_URL + '/Categories/' + categorieId, {
      subcategories: [subCategorieId]
    });
  }
  removeCategorie(id) {
    return axios.delete(API_URL + '/Categories/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
}
export default new CategoriesService();
