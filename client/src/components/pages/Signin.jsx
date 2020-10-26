import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../redux/actions/auth';
import { resetLogin } from '../../redux/actions/loginPage';

const Signin = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();

   const { isLoading, errors } = useSelector((state) => ({
      isLoading: state.loginPage.isLoading,
      errors: state.loginPage.errors,
   }));

   useEffect(() => {
      return () => {
         dispatch(resetLogin());
      };
   }, [dispatch]);

   const onSubmit = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
   };

   return (
      <div style={{ flexGrow: 1 }}>
         <div className='Signin'>
            <div className='auth-wrapper'>
               <div className='auth-section'>
                  <h1 className='auth-title'>Tratata</h1>
                  <form className='auth-form' onSubmit={onSubmit}>
                     <div className='auth-form-field'>
                        <input
                           type='text'
                           className='auth-form-input'
                           placeholder='эл. адрес'
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
                           {isLoading ? 'Загрузка...' : 'Войти'}
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
                     {/* <div className="auth-form-field"></div> */}
                  </form>
               </div>
               <div className='auth-section reg'>
                  <p className='have-account'>
                     У вас ещё нет аккаунта?{' '}
                     <Link to='/signup'>
                        <span>Зарегистрироваться</span>
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Signin;
