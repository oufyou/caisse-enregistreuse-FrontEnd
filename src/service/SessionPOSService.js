import axios from 'axios';
import { API_URL } from './consts';

/*
 * sessionPOS_State False z3ma rahna fwest session
 *
 * */
class SessionPOSService {
  startSessionPOS(start) {
    return axios
      .post(API_URL + '/SessionPOSs', {
        caissier_id: JSON.parse(sessionStorage.getItem('user')).id,
        OpenMontant: start,
        CloseMontant: 0,
        State: false,
        Comment: null
      })
      .then(response => {
        sessionStorage.setItem('sessionPOS_State', response.data.State);
        sessionStorage.setItem('sessionPOS_id', response.data.id);
      });
  }
  closeSessionPOS(end, comment) {
    return axios
      .put(
        API_URL + '/SessionPOSs/' + sessionStorage.getItem('sessionPOS_id'),
        {
          CloseMontant: end,
          Comment: comment
        }
      )
      .then(response => {
        sessionStorage.setItem('sessionPOS_State', response.data.State);
        sessionStorage.setItem('sessionPOS_id', 0);
      });
  }

  removeCategorie(id) {
    return axios.delete(API_URL + '/Categories/' + id);
  }
}
export default new SessionPOSService();
