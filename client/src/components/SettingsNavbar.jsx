import React from 'react';
import { NavLink } from 'react-router-dom';

const SettingsNavbar = () => {
   return (
      <ul className='settings-navbar'>
         <NavLink to='/settings/edit' activeClassName='active'>
            <li className='settings-item'>Редактировать профиль</li>
         </NavLink>
         <NavLink to='/settings/password/change' activeClassName='active'>
            <li className='settings-item'>Сменить пароль</li>
         </NavLink>
      </ul>
   );
};

export default SettingsNavbar;
