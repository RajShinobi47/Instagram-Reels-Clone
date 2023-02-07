import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {Routes, Route, Outlet} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const PrivateRoute = ({component : Component, ...rest}) => {

//  let loggedIn = false;

//  if(loggedIn){
//     return <Outlet/>
//  }
//  else{
//     return <Navigate to={"/login"} />;
//  }
const {user} = useContext(AuthContext);

return user ? <Outlet/> : <Navigate to={"/login"} /> 


}

export default PrivateRoute
