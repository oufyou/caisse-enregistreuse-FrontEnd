import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class ProductsService {
  getProducts() {
    return axios.get(API_URL + '/Products');
  }
  getAllBySubCategory(id) {
    return axios.get(API_URL + '/Products/subCategory=' + id);
  }
  createProduct(
    nom,
    description,
    codebarre,
    pu,
    etatexiste,
    codecolor,
    subcategory_id
  ) {
    return axios.post(API_URL + '/Products', {
      nom,
      description,
      codebarre,
      pu,
      etatexiste,
      codecolor,
      subcategory_id: subcategory_id
    });
  }
  removeProduct(id) {
    return axios.delete(API_URL + '/Products/' + id);
  }
}
export default new ProductsService();
