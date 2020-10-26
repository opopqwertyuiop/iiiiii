import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = ({ component: Component, restricted, ...rest }) => {
   const isAuth = useSelector((state) => state.auth.isAuth);
   return (
      <Route
         {...rest}
         render={(props) =>
            isAuth ? <Redirect to='/' /> : <Component {...props} />
         }
      />
   );
};

export default RestrictedRoute;
