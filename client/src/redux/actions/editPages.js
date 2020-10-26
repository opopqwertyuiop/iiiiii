import axios from 'axios';
import { setUser } from './auth';

const editStart = () => ({
   type: 'EDIT-START',
});

const resetEdit = () => ({
   type: 'RESET-EDIT',
});

const editSuccess = () => ({
   type: 'EDIT-SUCCESS',
});

const editFailed = (errors) => ({
   type: 'EDIT-FAILED',
   payload: errors,
});

const uploadAvatar = (file) => (dispatch) => {
   // console.log(file);
   const data = new FormData();
   data.append('file', file);
   data.append('upload_preset', 'iiiiii');
   data.append('cloud_name', 'cnq');

   const token = localStorage.getItem('jwt');

   dispatch(editStart());

   axios
      .post('http://localhost:5001/api/edit/avatar', data, {
         headers: {
            'Content-Type': 'form/multipart',
            Authorization: `Bearer ${token}`,
         },
      })
      .then((response) => {
         console.log(response.data);
         const user = response.data;
         response.data.token = token;
         dispatch(setUser(user));
         dispatch(editSuccess());
      })
      .catch((error) => {
         console.log(error.response.data.errors);
         dispatch(editFailed(error.response.data.errors));
      });
   // fetch('http://localhost:5001/api/edit/avatar', {
   //    method: 'post',
   //    body: data,
   // })
   //    .then((res) => res.json())
   //    .then((data) => console.log(data))
   //    .catch((error) => console.log(error));

   // console.log(file);
};

const editLogin = (login) => (dispatch) => {
   dispatch(editStart());
   axios
      .post(
         'http://localhost:5001/api/edit/login',
         { login },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
         }
      )
      .then((response) => {
         console.log(response);
         const user = response.data;
         response.data.token = localStorage.getItem('jwt');
         dispatch(setUser(user));
         dispatch(editSuccess());
      })
      .catch((error) => {
         console.log(error);
         dispatch(editFailed(error.response.data.errors.errors));
      });
};

const editPassword = (oldPassword, newPassword, newNewPassword) => (
   dispatch
) => {
   dispatch(editStart());
   axios
      .post(
         'http://localhost:5001/api/edit/password',
         { oldPassword, newPassword, newNewPassword },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
         }
      )
      .then((response) => {
         console.log(response);
         const user = response.data;
         response.data.token = localStorage.getItem('jwt');
         dispatch(setUser(user));
         dispatch(editSuccess());
      })
      .catch((error) => {
         console.dir(error);
         dispatch(editFailed(error.response.data.errors));
      });
   console.log();
};

export { uploadAvatar, resetEdit, editLogin, editPassword };
