import axios from 'axios';
import { API_URL } from './consts';

class PaymentsService {
  getPayments() {
    return axios.get(API_URL + '/Payments');
  }
  createPayment(payment) {
    return axios.post(API_URL + '/Payments', payment);
  }

  removePayment(id) {
    return axios.delete(API_URL + '/Payments/' + id);
  }
}
export default new PaymentsService();
