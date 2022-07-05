import axios from 'axios';
import { Route, useNavigate } from 'react-router-dom';
import authenticationService from '../services/authentication.service';

export default function() {
  axios.interceptors.request.use(
    (req) => {
      let currentUser = authenticationService.getInstance().username;
      let token = authenticationService.getInstance().token;
      if (currentUser && token) {
        if (req && req.headers)
          req.headers['authorization'] = `Bearer ${token}`;
      }
      return req;
    },
    (err) => {
      return Promise.reject(err);
      // console.log('error ',err)
      // return err;
    }
  );

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status == process.env.REACT_APP_STATUS_UNAUTHORIZE) {
        authenticationService.getInstance().errorMsg = err.message;
        window.location.href = '/error';
      }
      // return err;
      return Promise.reject(err);
    }
  );
}
