// import React, { useContext } from 'react';
// import { Redirect, Route } from 'react-router';
// import { UserContext } from '../../App';

// const PrivateRoute = ({children, ...rest}) => {
//     const [loggedInUser,setLoggedInUser]=useContext(UserContext);
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     return (
//         <div>
//             <Route
//                 {...rest}
//                 render={({ location }) =>
//                 user ||loggedInUser.username? (
//                         children
//                     ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/signin",
//                                 state: { from: location }
//                             }}
//                         />
//                     )
//                 }
//             />
//         </div>
//     );
// };

// export default PrivateRoute;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../App';

const PrivateRoute = ({ children }) => {
  const [loggedInUser] = useContext(UserContext);
  // const user = JSON.parse(sessionStorage.getItem('user'));
  const user = JSON.parse(localStorage.getItem('user'));

  const location = useLocation();

  return (user || loggedInUser?.username) ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
