import React from 'react';
// import { logout } from '../../redux/actions/auth';
// import { useDispatch } from 'react-redux';

import Header from '../Header';

const Main = () => {
   // const dispatch = useDispatch();
   return (
      <div
         style={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
         }}>
         <Header></Header>
         <div className='content'>
            {/* <button
               onClick={() => {
                  localStorage.removeItem('jwt');
                  dispatch(logout());
               }}>
               Выход
            </button> */}
         </div>
      </div>
   );
};

export default Main;
