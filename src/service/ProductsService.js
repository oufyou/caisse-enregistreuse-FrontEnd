import axios from 'axios';
import { API_URL } from './consts';

class ProductsService {
  getProducts() {
    return axios.get(API_URL + '/Products');
  }
  updateProduct(product) {
    return axios.put(API_URL + '/Products', product);
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
    subcategory_id,
    display = true
  ) {
    return axios.post(API_URL + '/Products', {
      nom,
      description,
      codebarre,
      pu,
      etatexiste,
      codecolor,
      subcategory_id: subcategory_id,
      display: display
    });
  }
  removeProduct(id) {
    return axios.delete(API_URL + '/Products/' + id);
  }
}
export default new ProductsService();
