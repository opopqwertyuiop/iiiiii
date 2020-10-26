import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../redux/actions/auth';
import { resetRegister } from '../../redux/actions/registerPage';

const Signup = () => {
   const [login, setLogin] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();

   useEffect(() => {
      return () => {
         dispatch(resetRegister());
      };
   }, [dispatch]);

   const { isLoading, errors, msg } = useSelector((state) => ({
      isLoading: state.registerPage.isLoading,
      errors: state.registerPage.errors,
      msg: state.registerPage.msg,
   }));

   const onSubmit = (e) => {
      e.preventDefault();
      dispatch(register(login, email, password));
   };

   if (msg) {
      return <Redirect to='/signin'></Redirect>;
   }

   return (
      <div style={{ flexGrow: 1 }}>
         <div className='signup'>
            <div className='auth-wrapper'>
               <div className='auth-section'>
                  <h1 className='auth-title'>Tratata</h1>
                  <form className='auth-form' onSubmit={onSubmit}>
                     <h2 className='auth-form-title'>
                        Зарегистрируйтесь, чтобы смотреть фото и видео ваших
                        друзей.
                     </h2>
                     <div className='auth-form-field'>
                        <input
                           type='text'
                           className='auth-form-input'
                           placeholder='Логин'
                           value={login}
                           onChange={(e) => setLogin(e.target.value)}
                           disabled={isLoading}
                        />
                     </div>
                     <div className='auth-form-field'>
                        <input
                           type='email'
                           className='auth-form-input'
                           placeholder='Эл. адрес'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           disabled={isLoading}
                        />
                     </div>
                     <div className='auth-form-field'>
                        <input
                           type='password'
                           className='auth-form-input'
                           placeholder='Пароль'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           disabled={isLoading}
                        />
                     </div>
                     <div className='reg-btn-wrapper'>
                        <button
                           className={`btn${isLoading ? ' loading' : ''}`}
                           disabled={isLoading}
                           style={{
                              cursor: `${isLoading ? 'default' : 'pointer'}`,
                           }}>
                           {isLoading ? 'Загрузка...' : 'Регистрация'}
                        </button>
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

                     <p className='privacy-policy'>
                        Регистрируясь, вы принимаете наши{' '}
                        <a
                           href='https://help.instagram.com/581066165581870'
                           target='_blank'
                           rel='noopener noreferrer'>
                           Условия
                        </a>
                        ,{' '}
                        <a
                           href='https://help.instagram.com/519522125107875'
                           target='_blank'
                           rel='noopener noreferrer'>
                           Политику использования данных
                        </a>{' '}
                        и{' '}
                        <a
                           href='https://help.instagram.com/1896641480634370?ref=ig'
                           target='_blank'
                           rel='noopener noreferrer'>
                           Политику в отношении файлов cookie
                        </a>
                        .
                     </p>
                     {/* <div className="auth-form-field"></div> */}
                  </form>
               </div>
               <div className='auth-section'>
                  <p className='have-account'>
                     Есть аккаунт?{' '}
                     <Link to='/signin'>
                        <span>Вход</span>
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Signup;
