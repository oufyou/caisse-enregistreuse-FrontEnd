import axios from 'axios';
import { API_URL } from './consts';

class RefundService {
  getRefund(saleId, customerId) {
    return axios.get(API_URL + '/GetCredit/' + saleId + '/' + customerId);
  }
  doRefund(refund) {
    return axios.post(API_URL + '/RefundPayment', refund);
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
export default new RefundService();
