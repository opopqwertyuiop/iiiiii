import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Header from './Header';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Footer from './Footer';
import Main from './pages/Main';
import Edit from './pages/Edit';
import ChangePassword from './pages/ChangePassword';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

import { auth } from '../redux/actions/auth';

function App() {
   const dispatch = useDispatch();

   const { isLoading } = useSelector((state) => ({
      isLoading: state.auth.isLoading,
   }));

   useEffect(() => {
      dispatch(auth());
   }, [dispatch]);

   if (isLoading) {
      return <p>Загрузка...</p>;
   }

   return (
      <div className='App'>
         <main className='main'>
            <Switch>
               <PrivateRoute component={Main} path='/' exact />
               <PrivateRoute component={Edit} path='/settings/edit' exact />
               <PrivateRoute
                  component={ChangePassword}
                  path='/settings/password/change'
                  exact
               />
               <RestrictedRoute component={Signup} path='/signup' exact />
               <RestrictedRoute component={Signin} path='/signin' exact />
               <Route path='/'>404</Route>
            </Switch>
            {/* <Header />
         <div className='container'></div> */}
         </main>
         <Footer />
      </div>
   );
}

export default App;
