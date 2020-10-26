import React, { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../redux/actions/auth';

const Header = () => {
   const { isAuth, avatar } = useSelector((state) => ({
      isAuth: state.auth.isAuth,
      avatar: state.auth.user.avatar,
   }));
   const [open, setOpen] = useState(false);
   const profile = useRef();
   const dispatch = useDispatch();

   const onClick = useCallback((e) => {
      if (!e.path.includes(profile.current)) {
         document.removeEventListener('click', onClick);
         setOpen(false);
      }
      console.log(e.path.includes(profile.current));
   }, []);

   const onProfileClick = (e) => {
      if (!open) {
         document.addEventListener('click', onClick);
         // return
         setOpen(true);
      } else {
         document.removeEventListener('click', onClick);
         setOpen(false);
      }
      // setOpen(!open);
   };

   const onExitClick = () => {
      localStorage.removeItem('jwt');
      dispatch(logout());
   };

   return (
      <header className='header'>
         <div className='container'>
            <nav className='header-nav'>
               <Link className='header-link' to='/'>
                  <h1 className='header-title'>Tratata</h1>
               </Link>
               <ul className='header-actions'>
                  <li className='header-action'>
                     <NavLink to='/' activeClassName='active'>
                        {/* {' '} */}
                        <svg
                           aria-label='Главная страница'
                           // class='_8-yf5 '
                           fill='#262626'
                           height='22'
                           viewBox='0 0 48 48'
                           width='22'>
                           <path d='M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z'></path>
                        </svg>
                     </NavLink>
                  </li>
                  <li
                     className='header-action profile'
                     onClick={onProfileClick}
                     ref={profile}>
                     <span>
                        <img src={avatar} alt='' />
                     </span>
                     <ul
                        className='profile-menu'
                        style={{ display: open ? 'block' : 'none' }}>
                        <li className='profile-menu-item'>
                           <svg
                              style={{
                                 marginRight: '8px',
                                 verticalAlign: 'middle',
                              }}
                              aria-label='Профиль'
                              // class='_8-yf5 '
                              fill='#262626'
                              height='16'
                              viewBox='0 0 32 32'
                              width='16'>
                              <path d='M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'></path>
                           </svg>
                           Профиль
                        </li>
                        <Link to='/settings/edit'>
                           <li className='profile-menu-item'>
                              <svg
                                 style={{
                                    marginRight: '8px',
                                    verticalAlign: 'middle',
                                 }}
                                 aria-label='Настройки'
                                 // class='_8-yf5 '
                                 fill='#262626'
                                 height='16'
                                 viewBox='0 0 32 32'
                                 width='16'>
                                 <path d='M31.2 13.4l-1.4-.7c-.1 0-.2-.1-.2-.2v-.2c-.3-1.1-.7-2.1-1.3-3.1v-.1l-.2-.1v-.3l.5-1.5c.2-.5 0-1.1-.4-1.5l-1.9-1.9c-.4-.4-1-.5-1.5-.4l-1.5.5H23l-.1-.1h-.1c-1-.5-2-1-3.1-1.3h-.2c-.1 0-.1-.1-.2-.2L18.6.9c-.2-.5-.7-.9-1.2-.9h-2.7c-.5 0-1 .3-1.3.8l-.7 1.4c0 .1-.1.2-.2.2h-.2c-1.1.3-2.1.7-3.1 1.3h-.1l-.1.2h-.3l-1.5-.5c-.5-.2-1.1 0-1.5.4L3.8 5.7c-.4.4-.5 1-.4 1.5l.5 1.5v.5c-.5 1-1 2-1.3 3.1v.2c0 .1-.1.1-.2.2l-1.4.7c-.6.2-1 .7-1 1.2v2.7c0 .5.3 1 .8 1.3l1.4.7c.1 0 .2.1.2.2v.2c.3 1.1.7 2.1 1.3 3.1v.1l.2.1v.3l-.5 1.5c-.2.5 0 1.1.4 1.5l1.9 1.9c.3.3.6.4 1 .4.2 0 .3 0 .5-.1l1.5-.5H9l.1.1h.1c1 .5 2 1 3.1 1.3h.2c.1 0 .1.1.2.2l.7 1.4c.2.5.7.8 1.3.8h2.7c.5 0 1-.3 1.3-.8l.7-1.4c0-.1.1-.2.2-.2h.2c1.1-.3 2.1-.7 3.1-1.3h.1l.1-.1h.3l1.5.5c.1 0 .3.1.5.1.4 0 .7-.1 1-.4l1.9-1.9c.4-.4.5-1 .4-1.5l-.5-1.5V23l.1-.1v-.1c.5-1 1-2 1.3-3.1v-.2c0-.1.1-.1.2-.2l1.4-.7c.5-.2.8-.7.8-1.3v-2.7c0-.5-.4-1-.8-1.2zM16 27.1c-6.1 0-11.1-5-11.1-11.1S9.9 4.9 16 4.9s11.1 5 11.1 11.1-5 11.1-11.1 11.1z'></path>
                              </svg>
                              Настройки
                           </li>
                        </Link>
                        <li className='profile-menu-item' onClick={onExitClick}>
                           Выйти
                        </li>
                     </ul>
                  </li>
               </ul>
            </nav>
         </div>
      </header>
   );
};

export default Header;
