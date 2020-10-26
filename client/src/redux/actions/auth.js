import axios from 'axios';

import { startRegister, registerFailed, registerSuccess } from './registerPage';
import { startLogin, loginFailed } from './loginPage';

const register = (login, email, password) => (dispatch) => {
   console.log('ee');
   if (!login.trim() || !email.trim() || !password.trim()) {
      return;
   }
   dispatch(startRegister());

   axios
      .post('http://localhost:5001/api/auth/signup', { login, email, password })
      .then((response) => {
         console.log(response);
         dispatch(registerSuccess());
      })
      .catch((error) => {
         console.log(error.response.data.errors);
         dispatch(registerFailed(error.response.data.errors));
      });
};

const setUser = (user) => ({
   type: 'SET-USER',
   payload: user,
});

const authSuccess = (user) => ({
   type: 'AUTH-SUCCESS',
   payload: user,
});

const authFailed = () => ({
   type: 'AUTH-FAILED',
});

const logout = () => ({
   type: 'LOGOUT',
});

const login = (email, password) => (dispatch) => {
   if (!email.trim() || !password.trim()) {
      return;
   }
   dispatch(startLogin());
   axios
      .post('http://localhost:5001/api/auth/signin', { email, password })
      .then((response) => {
         localStorage.setItem('jwt', response.data.token);
         dispatch(authSuccess(response.data));
      })
      .catch((error) => {
         dispatch(loginFailed(error.response.data.errors));
         dispatch(authFailed());
      });
};

const auth = () => (dispatch) => {
   const token = localStorage.getItem('jwt');
   if (!token) {
      return dispatch(authFailed());
   }
   axios
      .get('http://localhost:5001/api/auth', {
         headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
         const user = response.data;
         user.token = token;
         console.log(response.data);
         dispatch(authSuccess(user));
      })
      .catch((error) => {
         localStorage.removeItem('jwt');
         dispatch(authFailed());
      });
};

export { register, login, authFailed, logout, authSuccess, auth, setUser };
