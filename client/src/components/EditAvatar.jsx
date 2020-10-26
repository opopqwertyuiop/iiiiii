import React, { useState, useEffect } from 'react';
import { uploadAvatar } from '../redux/actions/editPages';
import { useDispatch } from 'react-redux';

const EditAvatar = ({ user, isLoading }) => {
   const [file, setFile] = useState(null);

   const dispatch = useDispatch();

   console.log(user);

   useEffect(() => {
      if (file) {
         dispatch(uploadAvatar(file));
      }
   }, [file, dispatch]);

   return (
      <div className='change-avatar'>
         <label className='change-avatar-img' htmlFor='file'>
            <img src={user.avatar} alt='' />
            <div
               className='change-img-loader'
               style={{ display: `${isLoading ? 'block' : 'none'}` }}></div>
         </label>
         <div className='change-avatar-right'>
            <p className='change-avatar-login'>{user.login}</p>
            <label className='change-avatar-btn' htmlFor='file'>
               {isLoading ? 'Загрузка' : 'Сменить фото профиля'}
            </label>
         </div>
         <input
            type='file'
            id='file'
            hidden
            disabled={isLoading}
            onChange={(e) => {
               setFile(e.target.files[0]);
            }}
         />
      </div>
   );
};

export default EditAvatar;
