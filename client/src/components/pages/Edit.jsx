import React, { useState, useEffect } from 'react';
import Header from '../Header';
import SettingsNavbar from '../SettingsNavbar';
import { useSelector, useDispatch } from 'react-redux';

import EditAvatar from '../EditAvatar';

import { resetEdit, editLogin } from '../../redux/actions/editPages';

const Edit = () => {
   const user = useSelector((state) => state.auth.user);
   const [login, setLogin] = useState(user.login);

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

   console.log();

   const onLoginClick = (e) => {
      e.preventDefault();
      dispatch(editLogin(login));
      console.log('e');
   };

   return (
      // <div>
      <div
         style={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
         }}
         className='edit'>
         <Header></Header>
         <div className='content'>
            <div className='container'>
               <div className='settings-wrapper'>
                  <SettingsNavbar></SettingsNavbar>
                  <div className='settings-content'>
                     <EditAvatar user={user} isLoading={isLoading} />
                     <form className='edit-form'>
                        <div className='edit-form-field'>
                           <label className='edit-form-label' htmlFor='login'>
                              Логин
                           </label>
                           <div className='edit-form-input-wrapper'>
                              <input
                                 type='text'
                                 id='login'
                                 className='edit-form-input'
                                 value={login}
                                 onChange={(e) => setLogin(e.target.value)}
                                 disabled={isLoading}
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
                           className='btn'
                           disabled={isLoading}
                           onClick={onLoginClick}>
                           {isLoading ? 'Загрузка...' : 'Отправить'}
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
