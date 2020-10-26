import React, { useState, useEffect } from 'react';
import Header from '../Header';
import SettingsNavbar from '../SettingsNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { editPassword, resetEdit } from '../../redux/actions/editPages';

const Edit = () => {
   const user = useSelector((state) => state.auth.user);
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [newNewPassword, setNewNewPassword] = useState('');

   const dispatch = useDispatch();

   useEffect(() => {
      return () => {
         dispatch(resetEdit());
      };
   }, [dispatch]);

   const { msg, errors, isLoading } = useSelector((state) => ({
      msg: state.editPages.msg,
      errors: state.editPages.errors,
      isLoading: state.editPages.isLoading,
   }));

   const onEditClick = (e) => {
      e.preventDefault();
      dispatch(editPassword(oldPassword, newPassword, newNewPassword));
   };

   return (
      // <div>
      <div
         style={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
         }}>
         <Header></Header>
         <div className='content'>
            <div className='container'>
               <div className='settings-wrapper'>
                  <SettingsNavbar></SettingsNavbar>
                  <div className='settings-content'>
                     <div className='change-avatar'>
                        <div className='change-avatar-img'>
                           <img
                              src='https://scontent-hel3-1.cdninstagram.com/v/t51.2885-19/s150x150/73003334_520617735206207_513415296732626944_n.jpg?_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_ohc=7prfmQy9IAEAX8foYnP&oh=cf56e2a6db0905d4a61b5e4932161660&oe=5FBCE7F6'
                              alt=''
                           />
                        </div>
                        <div className='change-avatar-right'>
                           <p className='change-avatar-login'>{user.login}</p>
                           {/* <button className='change-avatar-btn'>
                              Сменить фото профиля
                           </button> */}
                        </div>
                     </div>
                     <form className='edit-form'>
                        <div className='edit-form-field'>
                           <label
                              className='edit-form-label'
                              htmlFor='oldPassword'>
                              Старый пароль
                           </label>
                           <div className='edit-form-input-wrapper'>
                              <input
                                 type='password'
                                 id='oldPassword'
                                 className='edit-form-input'
                                 value={oldPassword}
                                 onChange={(e) =>
                                    setOldPassword(e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        <div className='edit-form-field'>
                           <label
                              className='edit-form-label'
                              htmlFor='newPassword'>
                              Новый пароль
                           </label>
                           <div className='edit-form-input-wrapper'>
                              <input
                                 type='password'
                                 id='newPassword'
                                 className='edit-form-input'
                                 value={newPassword}
                                 onChange={(e) =>
                                    setNewPassword(e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        <div className='edit-form-field'>
                           <label
                              className='edit-form-label'
                              htmlFor='rpassword'>
                              Подтвердите новый пароль
                           </label>
                           <div className='edit-form-input-wrapper'>
                              <input
                                 // w
                                 type='password'
                                 id='rpassword'
                                 className='edit-form-input'
                                 value={newNewPassword}
                                 onChange={(e) =>
                                    setNewNewPassword(e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        {errors.length !== 0 && (
                           <ul className='auth-errors'>
                              {errors.map((error, index) => (
                                 <li key={index} className='auth-error'>
                                    {error.msg}
                                 </li>
                              ))}
                           </ul>
                        )}
                        {msg && <p style={{ textAlign: 'center' }}>{msg}</p>}
                        <button
                           onClick={onEditClick}
                           style={{
                              cursor:
                                 !oldPassword ||
                                 !newPassword ||
                                 !newNewPassword ||
                                 isLoading
                                    ? 'default'
                                    : 'pointer',
                           }}
                           className={`btn${
                              !oldPassword ||
                              !newPassword ||
                              !newNewPassword ||
                              isLoading
                                 ? ' disabled'
                                 : ''
                           }`}
                           disabled={
                              !oldPassword ||
                              !newPassword ||
                              !newNewPassword ||
                              isLoading
                           }>
                           {isLoading ? 'Загрузка...' : 'Сменить пароль'}
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
      // </div>
   );
};

export default Edit;
