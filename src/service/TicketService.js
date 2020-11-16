import axios from 'axios';
import AuthenticationService from './AuthenticationService';
import { API_URL } from './consts';

class TicketService {
  getTicketZJour(date) {
    const ndate =
      new Date(date).getFullYear() +
      '-' +
      (new Date(date).getMonth() + 1) +
      '-' +
      new Date(date).getDate();
    return axios.get(API_URL + '/ticketZJour/' + ndate);
  }
  getTicketZMois(date) {
    return axios.get(API_URL + '/ticketZMois/' + date);
  }
  getTicketX() {
    return axios.get(
      API_URL + '/ticketX/' + AuthenticationService.getLoggedInUserId()
    );
  }
}
export default new TicketService();
