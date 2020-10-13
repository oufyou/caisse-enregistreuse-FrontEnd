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
  getAllBySubCategory(id) {
    return axios.get(API_URL + '/Products/subCategory=' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
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
    return axios.post(
      API_URL + '/Products',
      {
        nom,
        description,
        codebarre,
        pu,
        etatexiste,
        codecolor,
        subcategory_id: subcategory_id
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );
  }
  removeProduct(id) {
    return axios.delete(API_URL + '/Products/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
}
export default new ProductsService();
